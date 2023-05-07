import * as React from 'react';
import { SvgPropsType } from '../icons';
import Svg from 'react-native-svg';

export const ChevronDownIcon = ({ size, color, style }: SvgPropsType) => {
	const width = size ? size : 24;
	const height = size ? (size * 22) / 24 : 24;

	return (
		<Svg
			style={style}
			width={width}
			height={height}
			fill={color}
			viewBox='0 0 16 16'
		>
			<path d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z' />
		</Svg>
	);
};
