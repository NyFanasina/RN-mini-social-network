import Config, { axiosConfig } from '@/constants/Config'
import axios from 'axios'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Notification() {
    useEffect(() => {
        (async () => {
            axios.get(`${Config.baseURL}/notifi/notifications`, await axiosConfig())
                .then(res => {
                    console.log(res.data)
                })
                .catch(e => console.log(e))
        })()
    }, [])

    return (
        <View>
            <Text>notification</Text>
        </View>
    )
}

const styles = StyleSheet.create({})