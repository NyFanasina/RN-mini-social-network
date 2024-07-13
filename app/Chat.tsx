import Avatar from '@/components/Avatar'
import { Colors } from '@/constants/Colors'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'

export default function Chat() {
    return (
        <View style={s.container}>
            <View style={s.head}>
                <Avatar />
                <Text style={s.username}>Bianca Bellaire</Text>
            </View>
            <ScrollView>
                <Text style={s.msgIn}>Hello !</Text>
                <Text style={s.msgOut}>Hi !</Text>
            </ScrollView>
            <View style={s.form}>
                <TextInput style={s.input} />
                <TouchableOpacity style={s.btnSend}>
                    <Text>send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    username: {
        fontSize: 18,
        padding: 5
    },
    msgIn: {
        fontSize: 16,
        padding: 10,
        backgroundColor: Colors.rose,
        color: 'white'
    },
    msgOut: {
        fontSize: 16,
        textAlign: 'right',
        padding: 10,
        backgroundColor: Colors.gray,
        color: 'white'
    },
    form: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: Colors.gray
    },
    input: {
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderRadius: 20,
        margin: 5,
        padding: 5,
    },
    btnSend: {
        padding: 5,
    }
})