import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {

  useState(() => {
    setTimeout(() => {
      router.replace('SignIn')
    }, 2000);
  })

  return (
    <View style={s.container}>
      <Text style={s.brand}>Bla2</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  brand: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 15,
    fontSize: 35,
    color: 'white',
    backgroundColor: Colors.rose
  }
})