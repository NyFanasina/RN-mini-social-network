import myStorage from '@/AsyncStorage/myStorage';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import axios from 'axios';
import Config, { axiosConfig } from '@/constants/Config';
import { router } from 'expo-router';

export default function PhotoForm({ user }: any) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [image, setImage] = useState<any>({});

    useEffect(() => setModalVisible(false), [])

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [250, 250]
        })

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    }

    async function handleSave() {
        const fd = new FormData();

        const file: any = {
            uri: image.uri,
            type: image.mimeType,
            name: image.fileName
        }

        if (file.uri) fd.append('image', file)

        await axios.put(`${Config.baseURL}/auth/users/${user.id}`, fd, await axiosConfig("multipart/form-data"))
            .then(res => {
                setImage('');
                setModalVisible(false)
                router.push('Home');
            })
            .catch(e => console.log(e));
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Ma photo</Text>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={pickImage}>
                            <Ionicons name='cloud-upload-outline' size={45} />
                            <Text>Importer un photo</Text>
                        </TouchableOpacity>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={handleSave}>
                                <Text style={styles.btnText}>Sauvegarder</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={[styles.btnText, styles.btnTextCancel]}>Annuler</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal >
            <Pressable onPress={() => setModalVisible(true)}>
                <Text style={styles.links}>Mettre à jour ma photo</Text>
            </Pressable>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    }
    , title: {
        fontSize: 20,
        textAlign: 'center',
        padding: 15
    },
    input: {
        height: 45,
        margin: 2,
        paddingStart: 12,
        borderRadius: 15,
        borderColor: Colors.gray,
        borderWidth: 1,
    },
    links: {
        padding: 15,
        margin: 2,
        backgroundColor: Colors.light,
        borderWidth: 0.3,
        borderColor: Colors.gray,
        fontSize: 15
    },
    buttons: {
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        padding: 12,
        marginVertical: 10,
        marginHorizontal: 2,
        backgroundColor: Colors.rose,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: Colors.rose
    },
    buttonCancel: {
        backgroundColor: 'white',
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    btnTextCancel: {
        color: Colors.rose,
    },
});
