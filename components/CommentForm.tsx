import { Colors } from '@/constants/Colors'
import Config, { axiosConfig } from '@/constants/Config';
import axios from 'axios';
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function CommentForm({ postId, loadComment }: any) {
    const [newComment, setNewComment] = useState("");

    async function onComment() {
        const body = { content: newComment };

        axios.post(`${Config.baseURL}/comment/comments/${postId}`, body, await axiosConfig())
            .then(res => {
                loadComment();
                setNewComment("");
            })
            .catch(e => console.log(e))
    }

    function handleInput(text: string) {
        setNewComment(text);
    }

    return (
        <View style={s.container}>
            <TextInput style={s.input} placeholder='Laisser un Commentaire !' value={newComment} onChangeText={handleInput} />
            <TouchableOpacity style={s.btn} onPress={onComment} >
                <Text style={{ color: Colors.light }} >COMMENTER</Text>
            </TouchableOpacity>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        height: 60,
        marginHorizontal: 3
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        flex: 1,
        paddingStart: 10,
        backgroundColor: Colors.light,
    },
    btn: {
        justifyContent: 'center',
        padding: 12,
        verticalAlign: 'middle',
        borderWidth: 1,
        borderColor: Colors.light,
        backgroundColor: Colors.rose,
    }
})