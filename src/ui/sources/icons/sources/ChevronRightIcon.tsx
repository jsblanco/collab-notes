import Svg from "react-native-svg";
import type { SvgPropsType } from "..";

export const ChevronRightIcon = ({ size, color, style }: SvgPropsType) => {
	const width = size ?? 16;
	const height = size ?? 16;

	return (
		<Svg
			style={style}
			width={width}
			height={height}
			fill={color}
			viewBox="0 0 14 16"
		>
			<path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
		</Svg>
	);
};
