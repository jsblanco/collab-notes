import {Dimensions, StyleSheet} from "react-native";
import {colors, shadow} from "../constants/constants";

export default StyleSheet.create({
    card: {
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowRadius: 15,
        shadowOpacity: 0.26,
        elevation: 9,
        backgroundColor: colors.background,
    },
    modalOverlay: {
        justifyContent: "flex-end",
        backgroundColor: "#22222280",
        minHeight: 80,
        flex: 1,
    },
    modalView: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        marginTop: -30,
        width: '100%',
        borderColor: colors.grey["4"],
        paddingTop: 35,
        paddingBottom: 80,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10
    },
    flatlistHeader: {
        height: 50,
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: colors.background,
        ...shadow,
    },
    draggableIndicator: {
        width: Dimensions.get('window').width * 0.25,
        height: 4,
        marginTop: 15,
        borderRadius: 2,
        backgroundColor: '#ddd',
    },
    flatlistBackground: {
        height: Dimensions.get('window').height - 299,
    },
    inlineBlock: {
        flex: 1
    },
    row: {
        width: '100%',
        flexDirection: "row",
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    alignCenter: {
        alignItems: 'center',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    separator: {
        width: '100%',
        marginVertical: 30,
        borderBottomWidth: 2,
        borderColor: colors.grey['5'],
    }
})
