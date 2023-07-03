import * as React from 'react';
import { SvgPropsType } from '../icons';
import Svg from 'react-native-svg';

export const SmallPerson = ({ size, color, style }: SvgPropsType) => {
	const width = size ?? 17;
	const height = size ?? 17;

	return (
		<Svg
			style={style}
			width={width}
			height={height}
			fill={color}
			viewBox='0 0 17 17'
		>
			<path
				xmlns='http://www.w3.org/2000/svg'
				d='M8.5 8.5C10.8472 8.5 12.75 6.59721 12.75 4.25C12.75 1.90279 10.8472 0 8.5 0C6.15279 0 4.25 1.90279 4.25 4.25C4.25 6.59721 6.15279 8.5 8.5 8.5ZM11.3333 4.25C11.3333 5.81481 10.0648 7.08333 8.5 7.08333C6.93519 7.08333 5.66667 5.81481 5.66667 4.25C5.66667 2.68519 6.93519 1.41667 8.5 1.41667C10.0648 1.41667 11.3333 2.68519 11.3333 4.25Z'
				fill='black'
			/>
			<path
				xmlns='http://www.w3.org/2000/svg'
				d='M17 15.5833C17 17 15.5833 17 15.5833 17H1.41667C1.41667 17 0 17 0 15.5833C0 14.1667 1.41667 9.91667 8.5 9.91667C15.5833 9.91667 17 14.1667 17 15.5833ZM15.5833 15.5784C15.5813 15.2288 15.3655 14.1815 14.4045 13.2205C13.4805 12.2965 11.7429 11.3333 8.49999 11.3333C5.25708 11.3333 3.5195 12.2965 2.59547 13.2205C1.63449 14.1815 1.41868 15.2288 1.41667 15.5784H15.5833Z'
				fill='black'
			/>
		</Svg>
	);
};