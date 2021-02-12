import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {fetchLists} from "../../../store/lists/lists.actions";
import {RootState} from "../../../store/store";
import {constants} from "../../constants/constants";
import Text from "../../../UI/library/basics/Text/Text";
import styles from './ListsFlatlist.styles';
import ListItem from "../ListItem/ListItem";

const ListsFlatlist = ({listAction}: {listAction: (e?: any)=>any}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const lists = useSelector((state: RootState) => state.lists.lists)
    const error = useSelector((state: RootState) => state.lists.error)

    const loadCategories = useCallback(async () => {
        setIsRefreshing(true)
        await dispatch(fetchLists.request())
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
    if (!isLoading && lists.length === 0) return <View style={styles.screen}>
        <Text style={{color: constants.text.muted}}>You have created no products</Text>
    </View>

    const renderList = (list: any) => <ListItem list={list.item} listAction={listAction}/>

    return (
        <FlatList
            data={lists}
            refreshing={isRefreshing}
            onRefresh={loadCategories}
            renderItem={renderList}
            removeClippedSubviews={false}
            keyExtractor={item => item.id}
        />
    )
}

export default ListsFlatlist;

