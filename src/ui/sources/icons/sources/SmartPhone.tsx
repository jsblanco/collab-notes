import Svg from "react-native-svg";
import type { FillableSvgProps } from "..";

export const SmartPhone = ({ size, color, fill, style }: FillableSvgProps) => {
	const width = size ?? 512;
	const height = size ?? 512;

	return (
		<Svg
			style={style}
			width={width}
			height={height}
			fill={color}
			viewBox="0 0 16 16"
		>
			{fill ? (
				<path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
			) : (
				<>
					<path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
					<path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
				</>
			)}
		</Svg>
	);
};
