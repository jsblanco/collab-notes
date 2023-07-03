import React, {ReactNode} from 'react';
import {Modal as ReactModal, Pressable, TouchableOpacity, View, ViewStyle} from 'react-native';
import styles from './Layout.styles';

type ContainerType = {
    children: ReactNode,
    pointerEvents?: 'auto' | 'none' | 'box-none'
    center?: boolean,
    style?: ViewStyle
}

type RowType = {
    children: ReactNode,
    pointerEvents?: 'auto' | 'none' | 'box-none'
    centerX?: boolean,
    centerY?: boolean,
    style?: ViewStyle
}

export const Card = ({children, style}: { style?: ViewStyle, children: ReactNode }) => {
    return <View style={{...styles.card, ...style}}>
        {children}
    </View>
}

export const Modal = ({visible, onRequestClose, children, style}:
                          { visible: boolean, style?: ViewStyle, onRequestClose: () => void, children: ReactNode }) => {
    return (
        <ReactModal
            visible={visible}
            transparent={true}
            animationType={"fade"}
            onRequestClose={onRequestClose}
            presentationStyle={'overFullScreen'}
        >
            <Pressable style={styles.modalOverlay} onPress={onRequestClose}>
            </Pressable>
            <View style={[styles.modalView, style]}>
                {children}
            </View>
        </ReactModal>
    )
}

export const Padding = ({px}: { px: number }) => <View style={{padding: px}}/>;

export const DraggableHeader = () => {
    return (
        <View>
            <View style={styles.flatlistBackground}/>
            <View style={styles.flatlistHeader}>
                <TouchableOpacity style={styles.draggableIndicator}/>
            </View>
        </View>
    )
}

export const InlineBlock = ({children}: { children: ReactNode }) => {
    return <View style={{flexDirection: 'row'}}>
        <View style={styles.inlineBlock}/>
        {children}
        <View style={styles.inlineBlock}/>
    </View>
}

export const Row = ({children, centerX, centerY, style, pointerEvents='auto'}: RowType) => {
    return <View
        pointerEvents={pointerEvents}
        style={[
            styles.row,
            centerX && styles.justifyCenter,
            centerY && styles.alignCenter,
            style
        ]}>
        {children}
    </View>
}

export const Container = ({children, center, style, pointerEvents = 'auto'}: ContainerType) => {
    return <View
        pointerEvents={pointerEvents}
        style={[
            styles.container,
            center && styles.justifyCenter,
            style
        ]}>
        {children}
    </View>
}

export const Separator = () => (
    <View style={styles.separator}/>
)