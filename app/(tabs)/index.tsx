import { View, StyleSheet } from "react-native";
import {Link} from 'expo-router'
import { Button, Text } from "react-native-paper";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Query } from "react-native-appwrite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";


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
    <View style={styles.container}>
       <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>Today’s Habits</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          Sign out
        </Button>
       </View>
       {habits?.length === 0 ? (
        <View style={styles.emptyStateText}>
          <Text>No Habits yet</Text>
        </View>
       ):(
        habits?.map((habit, key) => (
          <Surface style={styles.card} elevation={0}>
        <View key={key} style={styles.cardContent}>
           <Text style={styles.cardTitle}> {habit.title} </Text>
           <Text style={styles.cardDescription}> {habit.description}</Text>
           <View style={styles.cardFooter}>
              <View style={styles.streakBadge}>
                 <MaterialCommunityIcons 
                 name="fire" 
                 size={18}
                 color={"#ff9800"}
                 /> 
                 <Text style={styles.streakText}>
                   {habit.streak_count} day streak
                 </Text>
              </View>
              <View style={styles.frequencyBadge}>
                 <Text style={styles.frequencyText}> 
                  {""}
                  {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)} </Text>
              </View>
           </View>
       </View>
       </Surface>
        ))
       )}
    </View>
  );
}


const styles =  StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",   
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#f7f2fa",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  CardContent :{
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
    cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});


