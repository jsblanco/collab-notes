import {StyleSheet} from "react-native";
import {colors} from "../constants/constants";

export default StyleSheet.create({
    filterPairing: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        maxWidth: 250,
    },
    filterName: {
        fontFamily: 'poppinsRegular',
        fontSize: 16
    },
    buttonContainer: {
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        overflow: "hidden",
    },
    buttonView: {
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 0,
    },
    buttonText: {
        color: colors.white,
        paddingBottom: 0,
        fontFamily: 'poppinsSemiBold',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bottomButtonContainer: {
        borderRadius: 50,
        overflow: "hidden",
        backgroundColor: colors.background,
        position: 'absolute',
        zIndex: 99,
        bottom: 20,
        right: 10,
    },
    bottomButtonView: {
        backgroundColor: colors.accent,
        borderRadius: 50,
        borderWidth: 0,
        padding: 15,
        margin: 2,
    },
    bottomButtonText: {
        color: 'white',
        paddingBottom: 0,
        fontFamily: 'poppinsRegular',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    roundButtonContainer: {
        overflow: "hidden",
        borderRadius: 99,
    },
    roundButtonContent: {
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 40,
        width: '100%',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.grey['5'],
    },
    inputPlaceholder: {
        color: 'white',
    },
    actionButtonLabel: {
        fontSize: 12,
        paddingTop: 8,
        textAlign: "center"
    }
})
