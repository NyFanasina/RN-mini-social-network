import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import Chatrooms from '@/components/Chatrooms'
import { Colors } from '@/constants/Colors'

export default function Chatroom() {
    return (
        <View style={s.container}>
            <Text style={s.head}>Messages</Text>
            <ScrollView >
                <TextInput style={s.input} placeholder='Trouvez ici vos messages' />
                <Chatrooms />
                <Chatrooms />
                <Chatrooms />
                <Chatrooms />
                <Chatrooms />
                <Chatrooms />
                <Chatrooms />
                <Chatrooms />
                <Chatrooms />
                <Chatrooms />
                <Chatrooms />
            </ScrollView>
            <TouchableOpacity style={s.newBtn}>
                <Text style={s.newBtnText}>Nouveau Message</Text>
            </TouchableOpacity>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1
    },
    head: {
        fontSize: 20,
        padding: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        marginHorizontal: 10,
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: Colors.gray,
        height: 45,
        borderRadius: 20,
        paddingStart: 18
    },
    newBtn: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        borderRadius: 4,
        alignSelf: 'baseline',
        padding: 10,
        backgroundColor: Colors.rose,
    },
    newBtnText: {
        fontSize: 16.5,
        fontStyle: "italic",
        color: Colors.light,
    }
})