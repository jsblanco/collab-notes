import React from "react";
import {
    Dimensions, Platform,
    StyleSheet,
    Text,
    TextStyle, TouchableNativeFeedback,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import {constants} from '../../../constants/constants';

const Button = (props: { onPress: (...args: any[]) => any | void, position?: ViewStyle, buttonStyle?: ViewStyle, textStyle?: TextStyle, children: React.ReactNode }) => {


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
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        overflow: "hidden",
    },
    view: {
        backgroundColor: constants.brightAccent,
        paddingVertical: Dimensions.get('window').height > 600 ? 10 : 7,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 0,
    },
    text: {
        color: 'white',
        paddingBottom: 0,
        fontFamily: 'openSans',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Button;
