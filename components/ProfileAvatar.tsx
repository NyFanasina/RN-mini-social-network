import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function ProfileAvatar({ username, img }: any) {
    const photo = <Image source={{ uri: img }} style={s.img} /> ?? <Ionicons name='person-sharp' size={50} />;

    return (
        <View style={s.container}>
            <View style={s.avatar}>
                <Image source={{ uri: img }} style={s.img} />
            </View>
            <Text style={s.name}>{username}</Text>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        padding: 5
    },
    avatar: {
        position: 'relative',
        width: 125,
        height: 125,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 4,
        borderColor: Colors.rose,
        backgroundColor: Colors.light,
        overflow: 'hidden'
    },
    edit: {
        position: 'absolute',
        padding: 1,
        color: Colors.gray,
        bottom: 0,
        right: 0,
        borderRadius: 50,
        width: 45,
        height: 45,
        borderWidth: 1
    },
    img: {
        width: 125,
        height: 125
    }
})