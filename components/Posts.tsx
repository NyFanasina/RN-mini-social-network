import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native'
import { Colors } from '@/constants/Colors'
import Avatar from './Avatar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { router } from 'expo-router'
import Config, { axiosConfig } from '@/constants/Config'
import ImageAutoSized from './ImageAutoSized'

export default function Posts({ post, showDownload }: any) {
    const [comments, setComments] = useState([]);
    const [countComment, setCountComment] = useState(0);
    const [countLike, setCountLike] = useState();

    useEffect(() => {
        getCountLike();
        loadComment();
    }, []);

    async function getCountLike() {
        axios.get(`${Config.baseURL}/like/likes/${post.id}`, await axiosConfig()).then(res => {
            const count = res.data.length;
            setCountLike(count)
        })
    }

    function loadComment() {
        axios.get(`${Config.baseURL}/comment/posts/${post.id}`)
            .then(res => {
                setComments(res.data);
                setCountComment(res.data.length)
            })
    }

    async function onLike() {
        axios.post(`${Config.baseURL}/like/likes/${post.id}`, {}, await axiosConfig())
            .then(res => getCountLike())
            .catch(e => console.log(e))
    }

    return (
        <View style={s.container} >
            <View style={s.head}>
                <Avatar img={post.profile_picture} />
                <Text style={s.label}>{post.username}</Text>
            </View>
            <TouchableOpacity onPress={() => router.navigate(`post/${post.id}`)}>
                <Text style={s.content}>{post.content}</Text>
                {post.media_url && <ImageAutoSized uri={post.media_url} showDownload={showDownload} />}
            </TouchableOpacity>

            {/* Menu: Like - Comment - Share */}
            <View style={menu.container}>
                <TouchableOpacity onPress={onLike}>
                    <Text style={menu.action}>{countLike == 0 ? '' : countLike} Like</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.navigate(`post/${post.id}`)}>
                    <Text style={menu.action}>{countComment} Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={menu.action}>Partager</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}


const s = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        borderTopWidth: 2.8,
        borderColor: Colors.gray
    },
    head: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginStart: 10,
        fontSize: 16
    },
    content: {
        marginStart: 5
    }
})

const menu = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    action: {
        textAlign: 'center',
        backgroundColor: '#e5e7eb',
        padding: 15,
        width: 120,
        borderRadius: 15
    }
})