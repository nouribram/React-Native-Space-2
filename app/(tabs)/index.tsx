import { Text, View, StyleSheet } from "react-native";
import {Link} from 'expo-router'
import { Button } from "react-native-paper";
import { use } from "react";
import { useAuth } from "@/lib/auth-context";


export default function Index() {
  const { signOut } = useAuth(); 
  return (
    <View style={styles.view} >
      <Text> Hello Nourhan</Text>
      <Button mode="text" onPress={signOut}>Sign out</Button>
    </View>
  );
}


const styles =  StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: 200,
    height: 50, 
    backgroundColor: "coral",
    borderRadius: 8,
    textAlign: "center", 
  }
});

