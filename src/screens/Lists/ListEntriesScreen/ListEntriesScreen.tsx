import React from 'react';
import {View} from 'react-native';
import styles from './ListEntriesScreen.styles';
import Text from "../../../UI/library/basics/Text/Text";
import EntriesFlatlist from "../../../UI/library/EntriesFlatlist/EntriesFlatlist";
import {StackScreenProps} from "@react-navigation/stack";

type Props = StackScreenProps<ListStack, 'ListEntriesScreen'>;

const ListEntriesScreen = ({route, navigation}: Props) => {

    return (
        <View style={styles.screen}>
            <EntriesFlatlist listId={route.params.listId}/>
        </View>
    )
}

export default ListEntriesScreen;
