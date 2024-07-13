import { useState } from "react";
import { Button, StyleSheet, Text, View, Alert, ScrollView, TextInput } from "react-native";
import Search from "@/app/(tabs)/Search";
import SignIn from "@/view/SignIn";
import Chat from "../Chat";

export default function Index() {

  return (
    <>
      <View style={{ flex: 1 }}>
        <SignIn />
        {/* <Chat /> */}
      </View>
    </>
  );
}
