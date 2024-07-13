import { View, Text, StyleSheet } from 'react-native'

export default function Header() {
    return (
        <View style={s.header}>
            <Text style={s.text}>Pow</Text>
        </View>
    )
}

const s = StyleSheet.create({
    header: {
        backgroundColor: '#f4f4f4'
    },
    text: {
        fontSize: 40
    }
})


