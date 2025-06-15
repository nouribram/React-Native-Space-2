import { Text, View, StyleSheet } from "react-native";
import {Link} from 'expo-router'
import { Button } from "react-native-paper";
import { use } from "react";
import { useAuth } from "@/lib/auth-context";
import { Query } from "react-native-appwrite";


export default function Index() {
  const { signOut, user } = useAuth();
  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
         HABITS_COLLECTION_ID, 
         [Query.equal("user_id", user?.$id ?? )]
        );
          
    } catch(error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.view} >
      <Text> Hello Nourhan</Text>
      <Button mode="text" onPress={signOut} icon={"logout"}>Sign out</Button>
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


