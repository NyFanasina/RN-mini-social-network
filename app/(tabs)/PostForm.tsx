import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import axios from 'axios';
import Config, { axiosConfig } from '@/constants/Config';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';


export default function PostForm() {
    const [image, setImage] = useState<any>({});
    const [content, setContent] = useState<string>('');

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    }

    async function uploadImageAsync(uri: any) {
        const fd = new FormData();

        const file: any = {
            uri: image.uri,
            type: image.mimeType,
            name: image.fileName
        }

        if (file.uri) fd.append('image', file)
        fd.append('content', content)

        if (image.uri || content)
            axios.post(`${Config.baseURL}/post/posts`, fd, await axiosConfig("multipart/form-data"))
                .then(res => {
                    setImage('');
                    setContent('');
                    router.push('Home');
                })
                .catch(e => console.log(e));
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
            <TouchableOpacity onPress={pickImage}>
                <Text style={s.addBtn}>Ajouter une photo</Text>
            </TouchableOpacity>
            <TextInput style={s.input} placeholder='Laisser une publication...' onChangeText={setContent} value={content} multiline />
            <View style={s.photoSet}>
                {image && <Image source={{ uri: image.uri }} style={s.photo} />}
            </View>
            <TouchableOpacity
                disabled={!(image.uri || content)}
                onPress={() => uploadImageAsync(image.uri)}
                style={!(image.uri || content) ? s.disabled : s.postBtn}
            >
                <Text style={s.postBtnText}>POSTER</Text>
            </TouchableOpacity>
        </View >
    )
}

const s = StyleSheet.create({
    addBtn: {
        textAlign: 'right',
        fontStyle: 'italic',
        padding: 5,
        textDecorationLine: 'underline'
    },
    input: {
        flex: 1,
        borderRadius: 15,
        height: 175,
        paddingStart: 15,
        textAlignVertical: 'top',
        fontSize: 18
    },
    photoSet: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    photo: {
        width: '85%',
        height: 160,
    },
    postBtn: {
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: '#3e3e3e',
        marginTop: 'auto'
    },
    disabled: {
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: Colors.gray,
    },
    postBtnText: {
        padding: 15,
        color: 'white'
    }
})


function parseBloadFromUri(uri: string) {
    return axios.get(uri, { responseType: 'blob' })
        .then(blob => blob)
        .catch(e => console.log('first'))
}