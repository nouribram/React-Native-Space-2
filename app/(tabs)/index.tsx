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