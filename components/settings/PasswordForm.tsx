import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function PasswordForm({ user, handleSave }: any) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [passwords, setPasswords] = useState<any>({});

    function handleNewPassword(newPassword: string) {
        setPasswords({ ...passwords, newPassword });
    }

    function handleOldPassword(oldPassword: string) {
        setPasswords({ ...passwords, oldPassword });
    }

    function handleConfirmation(confirmation: string) {
        setPasswords({ ...passwords, confirmation });
    }

    return (
        <View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Mot de passe</Text>
                    <TextInput style={styles.input} placeholder='Ancien mot de passe' onChangeText={handleOldPassword} value={passwords.oldPassword} />
                    <TextInput style={styles.input} placeholder='Nouveau mot de passe' onChangeText={handleNewPassword} value={passwords.newPassword} />
                    <TextInput style={styles.input} placeholder='Confirmation mot de passe' onChangeText={handleConfirmation} value={passwords.confirmation} />

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.btnText} onPress={() => handleSave(passwords)}>Savegarder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={[styles.btnText, styles.btnTextCancel]}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
            <Pressable onPress={() => setModalVisible(true)}>
                <Text style={styles.links}>Mettre à jour mon mot de passe</Text>
            </Pressable>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '96%',
        backgroundColor: 'white',
        padding: 15,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: Colors.gray,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45
    },
    hideModal: {

    },
    title: {
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
