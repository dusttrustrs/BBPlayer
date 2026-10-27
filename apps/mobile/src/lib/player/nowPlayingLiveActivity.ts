import { Orpheus } from '@bbplayer/orpheus'
import { Directory, File } from 'expo-file-system'
import { addUserInteractionListener, widgetsDirectory } from 'expo-widgets'
import { Platform } from 'react-native'

import log from '@/utils/log'

import NowPlayingActivity, {
	type NowPlayingActivityProps,
} from './nowPlayingActivity'

const logger = log.extend('Player.LiveActivity')

type Instance = ReturnType<typeof NowPlayingActivity.start>

let instance: Instance | null = null
let initialized = false
let syncing = false
let pending = false
let artworkFor = ''
let artworkPath = ''

/** 把封面下载成小图放进 app group，Live Activity 只能读这里的文件。 */
async function resolveArtwork(trackId: string, url?: string): Promise<string> {
	if (!url || !widgetsDirectory || !/^https?:/.test(url)) return ''
	if (artworkFor === trackId) return artworkPath
	artworkFor = trackId
	artworkPath = ''
	try {
		// B 站图床支持服务端缩放；Live Activity 内存很小，必须用小图
		const small = /hdslb\.com/.test(url)
			? `${url.split('@')[0]}@120w_120h.jpg`
			: url
		const dir = new Directory(widgetsDirectory)
		if (!dir.exists) dir.create()
		const file = new File(dir, 'nowplaying-art.jpg')
		if (file.exists) file.delete()
		const out = await File.downloadFileAsync(
			small.startsWith('//') ? `https:${small}` : small,
			file,
		)
		artworkPath = out.uri
	} catch (e) {
		logger.warning('下载封面失败', e)
	}
	return artworkPath
}

async function readProps(): Promise<NowPlayingActivityProps | null> {
	const track = await Orpheus.getCurrentTrack()
	if (!track) return null
	const [isPlaying, position, duration] = await Promise.all([
		Orpheus.getIsPlaying(),
		Orpheus.getPosition(),
		Orpheus.getDuration(),
	])
	const artwork = await resolveArtwork(track.id, track.artwork)
	const now = Date.now()
	const hasTime = duration > 0
	return {
		title: track.title ?? '',
		artist: track.artist ?? '',
		isPlaying,
		artwork,
		startMs: hasTime ? Math.round(now - position * 1000) : 0,
		endMs: hasTime ? Math.round(now + (duration - position) * 1000) : 0,
		progress: hasTime ? Math.min(1, Math.max(0, position / duration)) : 0,
	}
}

async function sync() {
	if (syncing) {
		pending = true
		return
	}
	syncing = true
	try {
		do {
			pending = false
			const props = await readProps()
			if (!props) {
				if (instance) {
					await instance.end('immediate')
					instance = null
				}
				continue
			}
			if (instance) {
				await instance.update(props)
			} else if (props.isPlaying) {
				// 播放中才创建；暂停状态下不新建，避免一直占着灵动岛
				instance = NowPlayingActivity.start(props, 'bbplayer://')
			}
		} while (pending)
	} catch (e) {
		logger.warning('同步 Live Activity 失败', e)
		instance = null
	} finally {
		syncing = false
	}
}

async function handleButton(target: string) {
	try {
		if (target === 'prev') await Orpheus.skipToPrevious()
		else if (target === 'next') await Orpheus.skipToNext()
		else if (target === 'toggle') {
			if (await Orpheus.getIsPlaying()) await Orpheus.pause()
			else await Orpheus.play()
		}
	} catch (e) {
		logger.warning('Live Activity 按钮操作失败', e)
	}
	void sync()
}

/**
 * 退出 App 时让「正在播放」卡片以系统原生动画飞入灵动岛。
 */
export function initNowPlayingLiveActivity() {
	if (Platform.OS !== 'ios' || initialized) return
	initialized = true
	try {
		instance = NowPlayingActivity.getInstances()[0] ?? null
	} catch (e) {
		logger.warning('读取已有 Live Activity 失败', e)
	}
	Orpheus.addListener('onTrackStarted', () => void sync())
	Orpheus.addListener('onIsPlayingChanged', () => void sync())
	Orpheus.addListener('onQueueChanged', () => void sync())
	addUserInteractionListener((e) => {
		// source 是 activity id，这个 App 只有这一个交互源，直接按 target 处理
		if (['prev', 'next', 'toggle'].includes(e.target)) void handleButton(e.target)
	})
	void sync()
}
