import React from "react";
import {TextInput, StyleSheet} from 'react-native';

const Input = (props: any) => {

    return <TextInput
        {...props}
        disableFullscreenUI={true}
        style={{...styles.input, ...props.style}}
    />
}

export default Input;

const styles = StyleSheet.create({
    input: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    }
})
