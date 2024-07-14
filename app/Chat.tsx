import Avatar from '@/components/Avatar'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'

export default function Chat() {
    return (
        <View style={s.container}>
            <View style={s.head}>
                <TouchableOpacity style={s.backBtn} onPress={router.back}>
                    <Ionicons name='chevron-back-outline' size={30} />
                </TouchableOpacity>
                <Text style={s.username}>Bianca Bellaire</Text>
            </View>
            <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 12 }}>
                <Text style={[s.msg, s.msgIn]}>Hey !</Text>
                <Text style={[s.msg, s.msgOut]}>Hello !</Text>
                <Text style={[s.msg, s.msgIn]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quam ratione totam, ullam nostrum tempore?</Text>
            </ScrollView>
            <View style={s.form}>
                <TextInput style={s.input} multiline={true} />
                <TouchableOpacity style={s.btnSend}>
                    <Ionicons name='send' size={33} color={Colors.rose} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        position: 'relative',
        padding: 15,
        borderColor: Colors.gray,
        borderBottomWidth: 0.2
    },
    backBtn: {
        position: "absolute",
        padding: 15
    },
    username: {
        margin: "auto",
        fontSize: 20,
    },
    msg: {
        fontSize: 16,
        padding: 10,
        marginVertical: 5
    },
    msgIn: {
        backgroundColor: Colors.lightGray,
        color: '#222',
        marginEnd: 'auto',
    },
    msgOut: {
        backgroundColor: Colors.rose,
        color: Colors.light,
        marginStart: 'auto'
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 0.2,
        borderColor: Colors.gray,
    },
    input: {
        flex: 1,
        backgroundColor: '#e5e7eb',
        borderWidth: 0.2,
        borderRadius: 20,
        paddingVertical: 4,
        paddingStart: 20
    },
    btnSend: {
        paddingHorizontal: 5,
    }
})