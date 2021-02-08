import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {constants} from "../../../constants/constants";

const Card = (props: { style?: ViewStyle, children: React.ReactNode }) => {

    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowRadius: 15,
        shadowOpacity: 0.26,
        elevation: 9,
        backgroundColor: constants.background || 'white'
    }
});

export default Card;
