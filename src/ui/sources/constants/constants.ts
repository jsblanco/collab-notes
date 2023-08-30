import { Dimensions } from 'react-native';

export const fonts = {
	regular: 'regular',
	regularThin: 'regular-Thin',
	regularBold: 'regular-Bold',
	regularBlack: 'regular-Black',
};

const textColors = {
	regular: '#303133',
	muted: '#A5A6AA',
};

const generalColorPalette = {
	green: '#06D6A0',
	blue: '#118AB2',
	mustard: '#EEC055',
	red: '#EF476F',
	darkBlue: '#073B4C',
};
const greyTones = {
	1: '#303133',
	2: '#727377',
	3: '#A5A6AA',
	4: '#D8D9DC',
	5: '#DEDEDE',
	6: '#ECECEE',
};

export const colors = {
	primary: '#3D55CC',
	accent: '#FF7C73',
	tertiary: '#29CCB1',
	success: '#29CCB1',
	warning: '#FF9900',
	danger: '#DD3636',
	white: '#ffffff',
	background: '#f2f2f2',
	text: textColors,
	general: generalColorPalette,
	grey: greyTones,
	completed: generalColorPalette.green,
	pending: generalColorPalette.mustard,
};

const { width } = Dimensions.get('window');
export const aspectRatio = width / 374;

export const shadow = {
	shadowColor: '#000',
	shadowOffset: { width: 2, height: 3 },
	shadowOpacity: 0.25,
	shadowRadius: 4,
	elevation: 5,
};
