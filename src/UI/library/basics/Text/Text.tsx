import React from "react";
import {Text as ReactText, StyleSheet, TextStyle} from 'react-native';
import {constants} from "../../../constants/constants";

const P = (props: { style?: TextStyle, numberOfLines?: number, children: React.ReactNode }) => {

    return <ReactText {...props} style={{...styles.text, ...props.style}}>
        {props.children}
    </ReactText>
}

export default P;

const styles = StyleSheet.create({
    text: {
        paddingBottom: 5,
        fontFamily: 'openSans',
        color: constants.text.regular
    },
})
