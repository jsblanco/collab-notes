import React from 'react';
import {Switch as ReactSwitch, View} from 'react-native';
import styles from './Switch.styles';
import Text from "../Text/Text";
import {constants} from "../../../constants/constants";

type SwitchPairing = {
    icon?: React.ReactNode
    label: string,
    state: boolean,
    onChange: (e: boolean) => void,
    textStyles?: StyleSheet
    viewStyles?: StyleSheet
}

const Switch = (props: SwitchPairing) => {
    let icon = undefined;
    if (!!props.icon) icon = <Text style={{marginRight: 20}}>{props.icon}{"     "}</Text>;

    return (
        <View style={{...styles.filterPairing, ...props.viewStyles}}>
            <Text style={{...styles.filterName, ...props.textStyles}}>
                {icon}
                {props.label}
            </Text>
            <ReactSwitch
                value={props.state}
                onValueChange={newValue => props.onChange(newValue)}
                trackColor={{true: constants.brightAccent + 60, false: '#d2d2d2'}}
                thumbColor={constants.brightAccent}
            />
        </View>
    )
}

export default Switch;
