import myStorage from '@/AsyncStorage/myStorage';
import Posts from '@/components/Posts';
import ProfileAvatar from '@/components/ProfileAvatar'
import { Colors } from '@/constants/Colors';
import Config, { axiosConfig } from '@/constants/Config';
import axios from 'axios'
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const { baseURL } = Config;

export default function Profile() {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [countPost, setCountPost] = useState<number>(0);
    const [posts, setPosts] = useState<Array<any>>([]);
    const [user, setUser] = useState<any>({});
    const userId = myStorage.getUserId();

    useEffect(() => {
        load();
    }, [])


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        load().finally(() => {
            setRefreshing(false);
        });
    }, []);

    async function onLogOut() {
        myStorage.distroy();
        router.push('/');
    }


    async function load() {
        const userId = await myStorage.getUserId();
        axios.get(`${baseURL}/auth/user/${userId}`, await axiosConfig())
            .then(res => {
                setUser(res.data[0]);
                loadPosts(res.data[0].username)
            })
            .catch(e => console.log(e))
    }

    async function loadPosts(username: string) {
        axios.get(`${baseURL}/post/posts`, await axiosConfig())
            .then(res => {
                const response = res.data.filter((post: any) => post.username == username);
                setCountPost(response.length);
                setPosts(response);
            })
            .catch(e => console.log(e))
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />}
        >
            <View>
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
                    <TouchableOpacity style={s.btn} onPress={onLogOut}>
                        <Text style={s.textBtn}>Se déconnecter</Text>
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
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
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
