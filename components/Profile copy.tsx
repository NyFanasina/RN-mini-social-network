import Posts from '@/components/Posts';
import ProfileAvatar from '@/components/ProfileAvatar'
import { Colors } from '@/constants/Colors';
import Config, { axiosConfig } from '@/constants/Config';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const { baseURL } = Config;

export default function Profile() {
    const [posts, setPosts] = useState<Array<any>>([]);
    const [user, setUser] = useState<any>({});
    const route = useRoute();

    useEffect(() => {
        const nextUser: any = route.params;
        console.log(route)
        if (user.id) setUser(nextUser);     // if state user is not empty
        else {
            (async () => axios.get(`${baseURL}/auth/user/${user.id}`, await axiosConfig())
                .then(res => {
                    setUser(res.data);
                    console.log('first')
                })
                .catch(e => console.log(e))
            )()
        }
        loadPosts();
    }, [route])

    async function onFollow() {
        axios.post(`${Config.baseURL}/follow/followers/${user.id}`, {}, await axiosConfig())
            .then(res => console.log(res.data))
            .catch(e => console.log(e))
    }

    async function loadPosts() {
        axios.get(`${baseURL}/post/posts`, await axiosConfig())
            .then(res => {
                const response = res.data.filter((post: any) => post.username == user.username)
                console.log(response)
                setPosts(response);
            })
            .catch(e => console.log(e))
    }

    return (
        <ScrollView>
            <View>
                <View style={s.container}>
                    <ProfileAvatar username={user.username} />
                    <View style={s.counts}>
                        <View style={s.count}>
                            <Text style={s.number}>9</Text>
                            <Text>Followers</Text>
                        </View>
                        <View style={s.count}>
                            <Text style={s.number}>25</Text>
                            <Text>Following</Text>
                        </View>
                    </View>
                </View>
                <Text style={s.bios}>{user.bio}</Text>
                <View>
                    <TouchableOpacity style={s.btn} onPress={onFollow}>
                        <Text style={s.textBtn}>Follow</Text>
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
        justifyContent: 'space-around'
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
