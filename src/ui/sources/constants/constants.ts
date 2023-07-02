import { Dimensions } from 'react-native';

export const colors = {
    primary: '#3D55CC',
    accent: '#FF7C73',
    tertiary: '#29CCB1',
    success: '#29CCB1',
    warning: '#FF9900',
    danger: '#DD3636',
    white: '#ffffff',
    background: '#f2f2f2',
    text: {
      regular: '#303133',
      muted: '#A5A6AA'
    },
    additional: {
        1: '#222F70',
        2: '#FAC132',
        3: '#0A5E66',
        4: '#FFD5D2',
        5: '#C1C9EF',
        6: '#BBEFE6',
        7: '#FDEBBD'
    },
    grey: {
        1: '#303133',
        2: '#727377',
        3: '#A5A6AA',
        4: '#C8C9CC',
        5: '#ECECEE',
    }
};

const { width } = Dimensions.get("window");
export const aspectRatio = width / 374;

export const shadow = {
    shadowColor: "#000",
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
}
