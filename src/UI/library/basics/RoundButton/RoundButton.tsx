import React from 'react';
import {Platform, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle} from 'react-native';
import styles from './RoundButton.styles';
import {Ionicons} from "@expo/vector-icons";

const RoundButton = ({onPress, onLongPress, children, size}:
                         { size: number, onPress: (...args: any[]) => any, onLongPress?: (...args: any[]) => any, children: React.ReactNode }) => {

    let ButtonType: any = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) ButtonType = TouchableNativeFeedback;

    return (
        <View style={styles.screen}>
            <ButtonType
                onPress={onPress} onLongPress={onLongPress}
                style={{...styles.button, height: size, width: size,}}
            >
                <View style={styles.content}>
                    {children}
                </View>
            </ButtonType>
        </View>
    )
}


export default RoundButton;
