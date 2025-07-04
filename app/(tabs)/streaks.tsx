import { Text, View } from "react-native";

export default function StreakScreen() {
   
   
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
   
    return (
        <View>
            <Text> Hello this is the login page</Text>
        </View>
    );
}