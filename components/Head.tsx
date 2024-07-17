import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Head({ title }: any) {
    return (
        <View style={styles.head}>
            <TouchableOpacity>
                <Ionicons name='chevron-back-outline' size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    title: {
        fontSize: 17
    }
})