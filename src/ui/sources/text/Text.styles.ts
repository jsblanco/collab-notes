import {StyleSheet} from "react-native";
import {colors} from "../constants/constants";

export default StyleSheet.create({
    H1: {
        fontFamily: "poppinsSemiBold",
        marginBottom: 32,
        lineHeight: 32,
        fontSize: 28,
        width: '100%',
    },
    H2: {
        fontFamily: 'poppinsSemiBold',
        lineHeight: 30,
        fontSize: 22,
    },
    H3: {
        fontFamily: 'poppinsSemiBold',
        lineHeight: 24,
        fontSize: 16,
    },
    P: {
        fontFamily: 'poppinsRegular',
        color: colors.text.regular,
        lineHeight: 20,
        fontSize: 14,
    },
    B: {
        fontFamily: 'poppinsSemiBold',
    },
    label: {
        fontFamily: 'poppinsRegular',
        marginTop: 10,
    },
    Error: {
        width: '100%',
        fontSize: 14,
        lineHeight: 21,
        borderRadius: 8,
        paddingTop: 6,
        paddingBottom: 4,
        paddingHorizontal: 8,
        color: colors.danger,
        backgroundColor: '#DD363608',
        fontFamily: 'poppinsSemiBold',
    },
    Placeholder: {
        fontSize: 20,
        lineHeight: 28,
        color: colors.grey["3"],
        fontFamily: 'poppinsSemiBold',
    },
})

