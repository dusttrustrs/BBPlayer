import { HStack, Image, Text, VStack } from '@expo/ui/swift-ui'
import { font, foregroundStyle, padding } from '@expo/ui/swift-ui/modifiers'
import { createLiveActivity } from 'expo-widgets'

export type NowPlayingActivityProps = {
	title: string
	artist: string
	isPlaying: boolean
}

/**
 * 正在播放的 Live Activity。
 * 活动存在时，退出 App 回到桌面会触发系统原生的「卡片飞入灵动岛」动画。
 * 布局只能使用 expo-ui 组件，且在独立运行时中渲染，不能使用 hooks / 外部状态。
 */
const NowPlayingActivity = (props: NowPlayingActivityProps) => {
	'widget'
	const symbol = props.isPlaying ? 'waveform' : 'pause.fill'

	return {
		banner: (
			<HStack modifiers={[padding({ all: 14 })]}>
				<Image systemName='music.note' color='#FF6B9D' />
				<VStack>
					<Text modifiers={[font({ weight: 'bold', size: 16 })]}>
						{props.title}
					</Text>
					<Text modifiers={[font({ size: 13 }), foregroundStyle('#8E8E93')]}>
						{props.artist}
					</Text>
				</VStack>
			</HStack>
		),
		compactLeading: <Image systemName='music.note' color='#FF6B9D' />,
		compactTrailing: <Image systemName={symbol} color='#FF6B9D' />,
		minimal: <Image systemName={symbol} color='#FF6B9D' />,
		expandedLeading: (
			<VStack modifiers={[padding({ all: 12 })]}>
				<Image systemName='music.note' color='#FF6B9D' />
			</VStack>
		),
		expandedTrailing: (
			<VStack modifiers={[padding({ all: 12 })]}>
				<Image systemName={symbol} color='#FF6B9D' />
			</VStack>
		),
		expandedBottom: (
			<VStack modifiers={[padding({ all: 12 })]}>
				<Text modifiers={[font({ weight: 'bold', size: 16 })]}>
					{props.title}
				</Text>
				<Text modifiers={[font({ size: 13 }), foregroundStyle('#8E8E93')]}>
					{props.artist}
				</Text>
			</VStack>
		),
	}
}

export default createLiveActivity('NowPlayingActivity', NowPlayingActivity)
