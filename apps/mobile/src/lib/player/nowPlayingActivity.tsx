import {
	Button,
	HStack,
	Image,
	ProgressView,
	Spacer,
	Text,
	VStack,
} from '@expo/ui/swift-ui'
import {
	activityBackgroundTint,
	buttonStyle,
	clipShape,
	font,
	foregroundStyle,
	frame,
	lineLimit,
	padding,
	tint,
	widgetURL,
} from '@expo/ui/swift-ui/modifiers'
import { createLiveActivity } from 'expo-widgets'

export type NowPlayingActivityProps = {
	title: string
	artist: string
	isPlaying: boolean
	/** 封面小图的 file:// 路径（app group 内），没有则为空串 */
	artwork: string
	/** 播放起点/终点（毫秒时间戳），用于系统自走的进度条；无时长则为 0 */
	startMs: number
	endMs: number
	/** 暂停时的静态进度 0~1 */
	progress: number
}

/**
 * 正在播放的 Live Activity。布局在独立运行时里渲染：
 * 不能用 hooks / 外部变量，所有常量必须写在函数体内，数据只能来自 props。
 */
const NowPlayingActivity = (props: NowPlayingActivityProps) => {
	'widget'
	const pink = '#FB7299'
	const title = props.title ? props.title : '未在播放'
	const hasTime = props.endMs > props.startMs
	const playSymbol = props.isPlaying ? 'pause.fill' : 'play.fill'

	const art = (size: number, radius: number) =>
		props.artwork ? (
			<Image
				uiImage={props.artwork}
				modifiers={[
					frame({ width: size, height: size }),
					clipShape('roundedRectangle', radius),
				]}
			/>
		) : (
			<Image
				systemName='music.note'
				size={size * 0.5}
				color={pink}
				modifiers={[frame({ width: size, height: size })]}
			/>
		)

	const progressBar = hasTime ? (
		props.isPlaying ? (
			<ProgressView
				timerInterval={{
					lower: new Date(props.startMs),
					upper: new Date(props.endMs),
				}}
				countsDown={false}
				modifiers={[tint(pink)]}
			/>
		) : (
			<ProgressView value={props.progress} modifiers={[tint(pink)]} />
		)
	) : null

	const controls = (
		<HStack spacing={22}>
			<Button target='prev' modifiers={[buttonStyle('plain')]}>
				<Image
					systemName='backward.fill'
					size={20}
					color='#FFFFFF'
					modifiers={[frame({ width: 44, height: 44 })]}
				/>
			</Button>
			<Button target='toggle' modifiers={[buttonStyle('plain')]}>
				<Image
					systemName={playSymbol}
					size={20}
					color='#FFFFFF'
					modifiers={[frame({ width: 44, height: 44 })]}
				/>
			</Button>
			<Button target='next' modifiers={[buttonStyle('plain')]}>
				<Image
					systemName='forward.fill'
					size={20}
					color='#FFFFFF'
					modifiers={[frame({ width: 44, height: 44 })]}
				/>
			</Button>
		</HStack>
	)

	const titleBlock = (
		<VStack spacing={2}>
			<Text
				modifiers={[
					font({ size: 15, weight: 'semibold' }),
					foregroundStyle('#FFFFFF'),
					lineLimit(1),
				]}
			>
				{title}
			</Text>
			{props.artist ? (
				<Text
					modifiers={[
						font({ size: 12 }),
						foregroundStyle('#C7C7CC'),
						lineLimit(1),
					]}
				>
					{props.artist}
				</Text>
			) : null}
		</VStack>
	)

	return {
		banner: (
			<VStack
				spacing={6}
				modifiers={[
					padding({ all: 16 }),
					activityBackgroundTint('#1C1C1E'),
					widgetURL('bbplayer://'),
				]}
			>
				<HStack spacing={12}>
					{art(64, 10)}
					{titleBlock}
					<Spacer />
				</HStack>
				{progressBar}
				{controls}
			</VStack>
		),
		compactLeading: art(22, 11),
		compactTrailing: (
			<Image
				systemName={props.isPlaying ? 'waveform' : 'pause.fill'}
				color={pink}
			/>
		),
		minimal: <Image systemName='music.note' color={pink} />,
		expandedLeading: (
			<VStack modifiers={[padding({ all: 8 })]}>{art(52, 8)}</VStack>
		),
		expandedTrailing: (
			<VStack modifiers={[padding({ all: 8 })]}>
				<Image
					systemName={props.isPlaying ? 'waveform' : 'pause.fill'}
					color={pink}
				/>
			</VStack>
		),
		expandedCenter: <VStack modifiers={[padding({ all: 8 })]}>{titleBlock}</VStack>,
		expandedBottom: (
			<VStack spacing={4} modifiers={[padding({ all: 8 })]}>
				{progressBar}
				{controls}
			</VStack>
		),
	}
}

export default createLiveActivity('NowPlayingActivity', NowPlayingActivity)
