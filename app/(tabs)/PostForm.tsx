import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import axios from 'axios';
import Config, { axiosConfig } from '@/constants/Config';
import { router } from 'expo-router';


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


        axios.post(`${Config.baseURL}/post/posts`, fd, await axiosConfig("multipart/form-data"))
            .then(res => {
                setImage('');
                setContent('');
                router.push('Home');
            })
            .catch(e => console.log(e));
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={pickImage}>
                <Text style={s.addBtn}>Ajouter une photo</Text>
            </TouchableOpacity>
            <TextInput style={s.input} placeholder='Laisser une publication...' onChangeText={setContent} value={content} />
            <View style={s.photoSet}>
                {image && <Image source={{ uri: image.uri }} style={{ height: 350, width: "100%" }} />}
            </View>
            <TouchableOpacity style={s.postBtn} onPress={() => uploadImageAsync(image.uri)}>
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
        borderRadius: 15,
        height: 140,
        margin: 5,
        paddingStart: 15,
        textAlignVertical: 'top',
        fontSize: 18
    },
    photoSet: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    postBtn: {
        position: 'absolute',
        bottom: 20,
        left: 160
    },
    postBtnText: {
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#3e3e3e',
        color: 'white'
    }
})


function parseBloadFromUri(uri: string) {
    return axios.get(uri, { responseType: 'blob' })
        .then(blob => blob)
        .catch(e => console.log('first'))
}