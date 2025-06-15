import { View, StyleSheet } from "react-native";
import {Link} from 'expo-router'
import { Button, Text } from "react-native-paper";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Query } from "react-native-appwrite";


export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>()
 
 useEffect(() => {
  fetchHabits();
 }, [user])
  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments(
         DATABASE_ID,
         HABITS_COLLECTION_ID, 
         [Query.equal("user_id", user?.$id ?? "" )]
        );
        setHabits(response.documents as Habit[]);
          
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <View style={styles.view}>
       <View>
        <Text variant="headlineSmall">Today’s Habits</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          Sign out
        </Button>
       </View>
       {habits?.length === 0 ? (
        
       )}
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


