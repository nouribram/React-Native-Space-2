import { Text, View, StyleSheet } from "react-native";
import {Link} from 'expo-router'


export default function Index() {
  return (
    <View style={styles.view} >
      <Text> Hello Nourhan</Text>
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


/*

git clone https://github.com/appwrite/starter-for-react-native

cd starter-for-react-native

const APPWRITE_PROJECT_ID = "6847c50f003853827abc";

*/

/*

EXPO_PUBLIC_APPWRITE_ENDPOINT=

*/