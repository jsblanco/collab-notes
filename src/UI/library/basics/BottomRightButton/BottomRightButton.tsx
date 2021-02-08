import React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TextStyle, TouchableNativeFeedback,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import {constants} from '../../../constants/constants';

const BottomRightButton = (props: { onPress: (...args: any[]) => any | void, position?: ViewStyle, buttonStyle?: ViewStyle, textStyle?: TextStyle, children: React.ReactNode }) => {


    let ButtonType: any = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonType = TouchableNativeFeedback;
    }

    return (
        <View style={{...styles.container, ...props.position}}>
            <ButtonType activeOpacity={0.6} onPress={props.onPress}>
                <View style={{...styles.view, ...props.buttonStyle}}>
                    <Text style={{...styles.text, ...props.textStyle}}>
                        {props.children}
                    </Text>
                </View>
            </ButtonType>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        overflow: "hidden",
        backgroundColor: constants.background,
        position: 'absolute',
        zIndex: 99,
        bottom: 20,
        right: 10,
    },
    view: {
        backgroundColor: constants.brightAccent,
        borderRadius: 50,
        borderWidth: 0,
        padding: 15,
        margin: 2,
    },
    text: {
        color: 'white',
        paddingBottom: 0,
        fontFamily: 'openSans',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default BottomRightButton;
