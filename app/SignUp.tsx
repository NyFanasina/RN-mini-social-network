
import axios from 'axios'
import { Colors } from '@/constants/Colors'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import Config from '@/constants/Config'
import { useRouter } from 'expo-router'
import myStorage from '@/AsyncStorage/myStorage'
const { baseURL } = Config


const SignUp = () => {
    const [user, setUser] = useState<any>({});
    const [error, setError] = useState<string>();
    const router = useRouter();

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

    function handleEmail(e: any): void {
        handleInput('email', e);
    }

    function handlePassword(e: any): void {
        handleInput('password', e)
    }

    function handleConfPassword(e: any): void {
        handleInput('confPassword', e)
    }

    function onSignUp() {
        if (user.confPassword === user.password) {
            axios.post(`${baseURL}/auth/register`, user)
                .then(res => {
                    myStorage.store(res.data);
                    router.push('/')
                })
                .catch(e => console.log(e))
        }
        else
            setError("Les deux mot de passe devrait correspondre.")
    }


    return (
        <ScrollView style={{ paddingHorizontal: 25 }}>
            <Text style={s.h1}>Creér Un Compte !</Text>
            <Text>{error}</Text>
            <View>
                <View style={{ marginVertical: 10 }}>
                    <Text>Pseudo:</Text>
                    <TextInput style={s.input} onChange={handleUsername} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>Email:</Text>
                    <TextInput style={s.input} onChange={handleEmail} />
                </View>
                <View style={{ marginVertical: 10 }} >
                    <Text>Mot de passe:</Text>
                    <TextInput style={s.input} onChange={handlePassword} />
                </View>
                <View style={{ marginVertical: 10 }} >
                    <Text>Confirmation du mot de passe:</Text>
                    <TextInput style={s.input} onChange={handleConfPassword} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity onPress={onSignUp}>
                        <Text style={s.signIn}>Creer mon compte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={s.signUp}>J'ai déja un compte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView >
    )
}

export default SignUp

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
    }
})
