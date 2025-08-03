import Svg from "react-native-svg";
import type { SvgPropsType } from "..";

export const ChevronLeftIcon = ({ size, color, style = {} }: SvgPropsType) => {
	const width = size ? (size * 22) / 24 : 24;
	const height = size ? size : 24;

	return (
		<Svg
			style={style}
			width={width}
			height={height}
			fill={color}
			viewBox="2 0 14 16"
		>
			<path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
		</Svg>
	);
};
