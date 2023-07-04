import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {fetchLists} from "../../store/lists/lists.actions";
import {RootState} from "../../store/store";
import styles from './ListsFlatlist.styles';
import ListItem from "../ListItem/ListItem";
import { Text, colors } from '../../ui/libUi';

const ListsFlatlist = ({listAction}: {listAction: (e?: any)=>any}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const lists = useSelector((state: RootState) => state.lists.lists)
    const error = useSelector((state: RootState) => state.lists.error)

    const loadLists = useCallback(async () => {
        setIsRefreshing(true)
        await dispatch(fetchLists.request())
        setIsRefreshing(false)
    }, [dispatch])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadLists)
        return unsubscribe();
    }, [loadLists])

    useEffect(() => {
        setIsLoading(true)
        loadLists().then(() => setIsLoading(false))
    }, [dispatch, loadLists])


    if (error) return <View style={styles.screen}>
        <Text style={{color: 'tomato'}}>{error}</Text>
    </View>
    if (isLoading) return <View style={styles.screen}>
        <ActivityIndicator size={'large'} color={colors.accent}/>
    </View>
    if (!isLoading && lists.length === 0) return <View style={styles.screen}>
        <Text style={{color: colors.text.muted}}>You have created no products</Text>
    </View>

    const renderList = (list: any) => <ListItem list={list.item} listAction={()=>listAction(list.item)}/>

    return (
        <FlatList
            data={lists}
            style={styles.screen}
            refreshing={isRefreshing}
            onRefresh={loadCategories}
            renderItem={renderList}
            removeClippedSubviews={false}
            keyExtractor={item => item.id}
        />
    )
}

export default ListsFlatlist;

