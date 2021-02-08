import React from 'react';
import {HeaderButton as HButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import {constants} from '../../../constants/constants';


export default function HeaderButton(props: any) {

    return (
        <HButton
            {...props}
            IconComponent={Ionicons}
            iconSize={21}
            color={constants.primary}
        />
    )
}
