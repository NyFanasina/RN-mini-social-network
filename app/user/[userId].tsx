import Posts from '@/components/Posts';
import ProfileAvatar from '@/components/ProfileAvatar'
import { Colors } from '@/constants/Colors';
import Config, { axiosConfig } from '@/constants/Config';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const { baseURL } = Config;

export default function User() {
    const [followBtnText, setFollowBtnText] = useState<string>('Follow');
    const [posts, setPosts] = useState<Array<any>>([]);
    const [user, setUser] = useState<any>({});
    const [countPost, setCountPost] = useState<number>(0);
    const route = useRoute();
    const { userId } = useLocalSearchParams();

    useEffect(() => {
        (async () => {
            axios.get(`${baseURL}/auth/user/${userId}`, await axiosConfig())
                .then(res => {
                    setUser(res.data[0]);
                    loadPosts(res.data[0].username)
                })
                .catch(e => console.log(e))
        })();
    }, [route])

    async function onFollow() {
        axios.post(`${Config.baseURL}/follow/followers/${user.id}`, {}, await axiosConfig())
            .then(res => setFollowBtnText(res.data.followed ? 'UnFollow' : 'Follow'))
            .catch(e => console.log(e))
    }

    async function loadPosts(username: string) {
        axios.get(`${baseURL}/post/posts`, await axiosConfig())
            .then(res => {
                const response = res.data.filter((post: any) => post.username == username);
                setCountPost(response.length)
                setPosts(response);
            })
            .catch(e => console.log(e))
    }

    return (
        <ScrollView>
            <View>
                <View style={s.head}>
                    <Ionicons name='arrow-back-outline' size={35} onPress={router.back} />
                </View>
                <View style={s.container}>
                    <ProfileAvatar username={user.username} img={user.profile_picture} />
                    <View style={s.counts}>
                        <View style={s.count}>
                            <Text style={s.number}>9</Text>
                            <Text>Followers</Text>
                        </View>
                        <View style={s.count}>
                            <Text style={s.number}>{countPost}</Text>
                            <Text>Posts</Text>
                        </View>
                    </View>
                </View>
                <Text style={s.bios}>{user.bio}</Text>
                <View>
                    <TouchableOpacity style={s.btn} onPress={onFollow}>
                        <Text style={s.textBtn}>{followBtnText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                posts.map((post: any) => {
                    return <Posts key={post.id} post={post} />
                })
            }
        </ScrollView>
    )
}

const s = StyleSheet.create({
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomWidth: 2,
        borderColor: Colors.gray
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15
    },
    counts: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    count: {
        padding: 15
    },
    number: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bios: {
        padding: 15,
    },
    btn: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.rose,
        width: '50%',
        paddingVertical: 12,
        margin: 15,
        borderRadius: 7
    },
    textBtn: {
        color: Colors.light,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }
})
