import React from 'react';
import {View} from 'react-native';
import styles from './ListsScreen.styles';
import ListsFlatlist from "../../../UI/library/ListsFlatlist/ListsFlatlist";
import {StackScreenProps} from "@react-navigation/stack";
import {List} from "../../../models/List/List";

type Props = StackScreenProps<ListStack, 'ListsScreen'>;

const ListsScreen = ({route, navigation}: Props) => {

    const navigateToList = (list: List) =>navigation.navigate('ListEntriesScreen', {listId: list.id})

    return (
        <View style={styles.screen}>
            <ListsFlatlist listAction={navigateToList}/>
        </View>
    )
}

export default ListsScreen;
