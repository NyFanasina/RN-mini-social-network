import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Avatar({ img }: any) {
    return (
        <View style={s.avatar}>
            {img ? <Image source={{ uri: img }} style={s.img} /> : <Ionicons name='person-sharp' size={30} />}
        </View>
    )
}

const s = StyleSheet.create({
    avatar: {
        width: 49,
        height: 49,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2.5,
        borderColor: Colors.rose,
        backgroundColor: Colors.light,
        overflow: 'hidden'
    },
    img: {
        width: 45,
        height: 45
    }
})