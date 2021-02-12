import React from 'react';
import {Pressable, View} from 'react-native';
import styles from './ListItem.styles';
import Text from "../../../UI/library/basics/Text/Text";
import {List} from "../../../models/List/List";

const ListItem = ({list, listAction}: {list: List, listAction: (e?: any)=>any}) => {

    return (
        <Pressable style={styles.screen} onPress={listAction}>
            <Text>ListItem works!</Text>
        </Pressable>
    )
}

export default ListItem;
