import myStorage from '@/AsyncStorage/myStorage';
import { Colors } from '@/constants/Colors'
import Config from '@/constants/Config';
import axios from 'axios';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
const { baseURL } = Config;

const initialUser = {
    username: '',
    password: '',
}

export default function SignIn() {
    const [user, setUser] = useState<any>(initialUser);
    const [error, setError] = useState<string>("");

    function handleInput(key: string, event: any) {
        event.persist();
        const value = event.nativeEvent.text;

        setUser({
            ...user,
            [key]: value
        });
    }

    function handleUsername(e: any): void {
        handleInput('username', e);
    }

    function handlePassword(e: any): void {
        handleInput('password', e)
    }

    function onLogin() {
        axios.post(`${baseURL}/auth/login`, user)
            .then(res => {
                myStorage.store(res.data)
                router.push('/Home')
                setUser({});
            })
            .catch(e => {
                if (e.response.status === 401) setError('Pseudo ou mot de passe incorrect.')
            })
    }


    return (
        <View style={{ paddingHorizontal: 25 }}>
            <Text style={s.h1}>Bienvenue sur Pow !</Text>
            <View>
                <Text style={s.error}>{error}</Text>
                <View style={{ marginVertical: 10 }}>
                    <Text>Username:</Text>
                    <TextInput style={s.input} onChange={handleUsername} value={user.username} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>Mot de passe:</Text>
                    <TextInput style={s.input} onChange={handlePassword} value={user.password} secureTextEntry />
                </View>
                <TouchableOpacity>
                    <Text style={s.signIn} onPress={onLogin}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Link href='/SignUp' style={s.signUp}>Créer un compte</Link>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    h1: {
        fontSize: 30,
        paddingVertical: 30,
        marginTop: 25,
        textAlign: 'center',
    },
    input: {
        height: 45,
        margin: 2,
        paddingStart: 12,
        borderRadius: 15,
        borderColor: Colors.gray,
        borderWidth: 1,
    },
    signIn: {
        textAlign: 'center',
        padding: 15,
        margin: 1,
        borderRadius: 15,
        backgroundColor: Colors.rose,
        color: 'white',
        borderWidth: 0.5,
        borderColor: Colors.rose
    },
    signUp: {
        textAlign: 'center',
        padding: 15,
        margin: 1,
        borderRadius: 15,
        color: '#2e2e2e',
        borderWidth: 0.7,
        borderColor: Colors.rose
    },
    error: {
        color: Colors.rose,
        fontSize: 20
    }

})