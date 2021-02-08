import React from 'react';
import {View} from 'react-native';
import styles from './StartupScreen.styles';
import Text from "../../../UI/library/basics/Text/Text";

const StartupScreen = (props: any) => {

    return (
        <View style={styles.screen}>
            <Text>StartupScreen works!</Text>
        </View>
    )
}

export default StartupScreen;
