import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import Text from "../../../UI/library/basics/Text/Text";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {fetchListEntries} from "../../../store/entries/entries.actions";
import {RootState} from "../../../store/store";
import {constants} from "../../constants/constants";
import styles from './EntriesFlatlist.styles';
import EntryItem from "../EntryItem/EntryItem";
import {SwipeListView} from 'react-native-swipe-list-view';

const EntriesFlatlist = ({listId}: { listId: string }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const entries = useSelector((state: RootState) => state.entries.entries)
    const error = useSelector((state: RootState) => state.entries.error)

    const loadCategories = useCallback(async () => {
        setIsRefreshing(true)
        await dispatch(fetchListEntries.request(listId))
        setIsRefreshing(false)
    }, [dispatch])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadCategories)
        return unsubscribe();
    }, [loadCategories])

    useEffect(() => {
        setIsLoading(true)
        loadCategories().then(() => setIsLoading(false))
    }, [dispatch, loadCategories])


    if (error) return <View style={styles.screen}>
        <Text style={{color: 'tomato'}}>{error}</Text>
    </View>
    if (isLoading) return <View style={styles.screen}>
        <ActivityIndicator size={'large'} color={constants.brightAccent}/>
    </View>
    if (!isLoading && entries.length === 0) return <View style={styles.screen}>
        <Text style={{color: constants.text.muted}}>You have created no products</Text>
    </View>

    const renderList = (entry: any) => <EntryItem entry={entry.item} action={(e) => console.log(e)}/>

    return (
        <SwipeListView
            data={entries}
            style={styles.screen}
            renderItem={renderList}
            renderHiddenItem={(data, rowMap) => (
                <View style={{justifyContent: "space-between", flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <Text>Left</Text>
                    <Text>Right</Text>
                </View>
            )}
            leftOpenValue={50}
            rightOpenValue={-50}
            refreshing={isRefreshing}
            onRefresh={loadCategories}
        />
    )


}

export default EntriesFlatlist;
