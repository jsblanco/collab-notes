import {StyleSheet} from "react-native";

export default StyleSheet.create({
    screen: {
        height: 50,
        width: '100%',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
    taskComplete:  {
        backgroundColor: 'green',
        color: '#fff',
        flex:1,
    },
    editTask: {
        backgroundColor: 'blue',
        color: '#fff',
        flex:1,
    },
})
