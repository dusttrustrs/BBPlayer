import { Orpheus } from '@bbplayer/orpheus'
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

async function readProps(): Promise<NowPlayingActivityProps | null> {
	const track = await Orpheus.getCurrentTrack()
	if (!track) return null
	const isPlaying = await Orpheus.getIsPlaying()
	return {
		title: track.title ?? '',
		artist: track.artist ?? '',
		isPlaying,
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
				instance = NowPlayingActivity.start(props)
			}
		} while (pending)
	} catch (e) {
		logger.warning('同步 Live Activity 失败', e)
		instance = null
	} finally {
		syncing = false
	}
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
	void sync()
}
