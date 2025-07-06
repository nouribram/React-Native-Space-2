import { Text, View } from "react-native";
import { useState } from "react";
import { HabitCompletion } from "@/types/database.type";



export default function StreakScreen() {
   
    const [habits, setHabits] = useState<Habit[]>();
   
    const [completedHabits, setCompletedHabits] = useState<HabitCompletion[]>()
  
    const {user} = useAuth();
    
    
    useEffect(() => {
      
     if (user) {  
      fetchHabits();
      fetchTodayCompletions();
      }
    }, [user]);
   
    return (
        <View>
            <Text> Hello this is the login page</Text>
        </View>
    );
}