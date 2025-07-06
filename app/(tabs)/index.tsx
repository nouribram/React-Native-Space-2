import { View, StyleSheet, ScrollView } from "react-native";
import {Link} from 'expo-router'
import { Button, Text, Surface } from "react-native-paper";
import { use, useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Databases, Query } from "react-native-appwrite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";
import { Swipeable } from "react-native-gesture-handler";
import { HabitCompletion } from "@/types/database.type";

//appwrite 
/*export interface RealtimeResponse {
  events: string[];
  payload: any;
}*/

export default function Index() {

  const { signOut, user } = useAuth();
 
  const [habits, setHabits] = useState<Habit[]>();
 
  const [completedHabits, setCompletedHabits] = useState<string[]>()

  const SwipeableRefs = useRef<{ [key: string]: Swipeable | null}> ({})

 useEffect(() => {
   
  if (user) {

  const habitsChannel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`,
  
  const habitsSubscription = client.subscribe(
     habitsChannel,
    (response: RealtimeResponse) => {
      if(
        response.events.includes(
        "databases.*.collections.*.documents.*.create"
      )
    ){
        fetchHabits();

    } else if(
        response.events.includes(
        "databases.*.collections.*.documents.*.update"
      )
    ){
        fetchHabits();
    }
    
   }
  );


  
  const completionsChannel = `databases.${DATABASE_ID}.collections.${COMOLETIONS_COLLECTION_ID}.documents`,
  
  const completionsSubscription = client.subscribe(
     completionsChannel,
    (response: RealtimeResponse) => {
      if(
        response.events.includes(
        "databases.*.collections.*.documents.*.create"
      )
    ){
        fetchTodayCompletions();

    } else if(
       response.events.includes(
        "databases.*.collections.*.documents.*.update"
      )
    ){
        fetchHabits();
    }
    
   }
  );


   fetchHabits();
  
   fetchTodayCompletions();

   return () => {
    habitsSubscription();
    completionsSubscription();
   }
  }
 }, [user]);
 
  const fetchTodayCompletions = async () => {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0);
      const response = await databases.listDocuments(
         DATABASE_ID,
         COMPLETIONS_COLLECTION_ID, 
         [
          Query.equal("user_id", user?.$id ?? "" ), 
          Query.greaterThanEqual("completed_at", today.toISOString()),

         ]
        );
          
        const completions = response.documents as HabitCompletion[]

        setCompletedHabits(completions.map((c) => c.habit_id));
          
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDeleteHabit = async (id: string) => {
     if  (!user || completedHabits?.includes(id)) return;
    try {
        const currentDate = new Date().toISOString()
        await databases.createDocument(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID, 
        ID.unique(),
        {
            
          habit_id: id,
          user_id: user.$id,
          completed_at: new Date().toISOString(),

       }
      );

      const habit = habits?.find((h) => h.$id === id)
      {
       if (!habit) return; 
       await databases.updateDocument(DATABASE_ID, HABITS_COLLECTION_ID, id, {
         streak_count: habit.streak_count + 1,
         last_completed: currentDate,
       });
      
      
      } catch (error) {
         console.error(error);
       }
  };


  const isHabitCompleted = (habitId: string) =>
  completedHabits?.includes(habitId);


  const renderRightActions = (habitId: string) => (
    <View style={styles.swipeActionRight}>
      {isHabitCompleted(habitId) ? (
        <Text style={{color: "#fff"}}>Completed!</Text>
      ) : (
      <MaterialCommunityIcons 
      name="check-circle-outline" 
       size={32} 
       color={"#fff"}/>
      )}
    </View>
  );

  const renderLeftActions = () => {
     <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons 
      name="trash-can-outline" 
       size={32} 
       color={"#fff0"}/>
    </View>
  };


  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>Today’s Habits</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          Sign out
        </Button>
       </View>

       <ScrollView showsVerticalScrollIndicator={false}>
       {habits?.length === 0 ? (
        <View style={styles.emptyStateText}>
          <Text>No Habits yet</Text>
        </View>
       ):(
        habits?.map((habit, key) => (
         <Swipeable ref={(ref) => {
          SwipeableRefs.current[habit.$id] = ref
         }}
          key ={key}
          overshootLeft={false}
          overshootRight={false}
          renderLeftActions={renderLeftActions}
          renderRightActions={() => renderRightActions(habit.$id)}
          onSwipeableOpen={(direction) => {
           if (direction === "left"){
            handleDeleteHabit(habit.$id);
           } else if (direction === "right")
           {
               handleCompleteHabit(habit.$id);
           }
           SwipeableRefs.current[habit.$id]?.close();
          }}
        >
        <Surface style={styles.card, isHabitCompleted(habit.$id) && styles.cardCompleted,

        } elevation={0}>
        <View  style={styles.cardContent}>
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
       </Swipeable> 
        ))
       )}
       </ScrollView>
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
  cardCompleted: {
    backgroundColor: "#f7f2fa"
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
    alignItems: "center", 
  },
  frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
   frequencyText: {
    color: "#7c4dff",
    fontWeight: "bold",
    fontSize: 14,
   },
   emptyState:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   }
   emptyStateText:{
    color: "#666666",
   },
   swipeActionLeft: {
     justifyContent: "center",
     alignItems: "flex-end",
     flex: 1,
     backgroundColor: "#e53935",
     borderRadius: 18,
     marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
   },
    swipeActionRight: {
      justifyContent: "center",
      alignItems: "flex-end",
      flex: 1,
      backgroundColor: "#4caf50",
      borderRadius: 18,
      marginBottom: 18,
     marginTop: 2,
     paddingRight: 16,
   },
});


