import { StyleSheet, Text, View } from 'react-native'
import Avatar from './Avatar'
import { Colors } from '@/constants/Colors'

export default function Comment({ username, content, img }) {
    return (
        <View style={s.container}>
            <Avatar img={img} />
            <View style={s.core}>
                <Text style={s.user}>{username}</Text>
                <Text>{content}</Text>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.light,
        flexDirection: 'row',
        padding: 5
    },
    core: {
        paddingHorizontal: 10,
        // backgroundColor: 'red',
    },
    user: {
        fontWeight: 'bold'
    }
})