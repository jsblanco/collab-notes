import React from 'react';
import {View} from 'react-native';
import styles from './AuthScreen.styles';
import Text from "../../../UI/library/basics/Text/Text";

const AuthScreen = (props: any) => {

    return (
        <View style={styles.screen}>
            <Text>AuthScreen works!</Text>
        </View>
    )
}

export default AuthScreen;
