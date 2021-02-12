import React from 'react';
import {View} from 'react-native';
import styles from './EntryItem.styles';
import Text from "../../../UI/library/basics/Text/Text";
import {Entry} from "../../../models/Entry/Entry";

const EntryItem = ({entry, action}: {entry: Entry, action: (e:any)=>any }) => {

    return (
        <View style={styles.screen}>
            <Text>EntryItem works!</Text>
        </View>
    )
}

export default EntryItem;
