import Posts from '@/components/Posts'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import Comment from '@/components/Comment'
import Config, { axiosConfig } from '@/constants/Config';
import { useEffect, useState } from 'react'
import axios from 'axios'
import CommentForm from '@/components/CommentForm'
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Post() {
    const [comments, setComments] = useState<any>([]);
    const [post, setPost] = useState<any>({});
    const { postId } = useLocalSearchParams();

    useEffect(() => {
        loadPost();
        loadComment();
    }, []);

    async function loadPost() {
        axios.get(`${Config.baseURL}/post/posts/id/${postId}`, await axiosConfig())
            .then(res => {
                setPost(res.data[0]);
            })
            .catch(e => console.log('What the matter with you'))
    }

    function loadComment() {
        axios.get(`${Config.baseURL}/comment/posts/${postId}`)
            .then(res => {
                setComments(res.data);
            })
            .catch(e => console.log(e))
    }

    return (
        <ScrollView>
            <View>
                {post.id && <Posts post={post} showDownload={postId} />}
                <CommentForm postId={postId} loadComment={loadComment} />
                {
                    comments.map((comment: any) => <Comment key={comment.id} username={comment.username} img={comment.profile_picture} content={comment.content} />)
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})



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
})