import * as React from 'react';
import Svg from 'react-native-svg';
import { SvgPropsType } from '..';

export const SmallBed = ({ size, color, style }: SvgPropsType) => {
	const width = size ?? 18;
	const height = size ?? 13;

	return (
		<Svg
			style={style}
			width={width}
			height={height}
			fill={color}
			viewBox="0 0 18 13">
			<path
				xmlns="http://www.w3.org/2000/svg"
				d="M18 6.3C18 5.31 17.19 4.5 16.2 4.5V1.8C16.2 0.81 15.39 0 14.4 0H3.6C2.61 0 1.8 0.81 1.8 1.8V4.5C0.81 4.5 0 5.31 0 6.3V10.8H1.197L1.8 12.6H2.7L3.303 10.8H14.706L15.3 12.6H16.2L16.803 10.8H18V6.3ZM14.4 4.5H9.9V1.8H14.4V4.5ZM3.6 1.8H8.1V4.5H3.6V1.8ZM1.8 6.3H16.2V9H1.8V6.3Z"
				fill="black"
			/>
		</Svg>
	);
};
