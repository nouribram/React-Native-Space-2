import { Button } from "@react-navigation/elements";
import { KeyboardAvoidingView, Platform, View} from "react-native";
import {Text, TextInput} from "react-native-paper";

export default function AuthScreen() {
    return ( 
    <KeyboardAvoidingView 
    
    behavior={Platform.OS === "ios" ? "padding" : "height"}>

        <View>
            <Text> Create account</Text>
             <TextInput 
             label="Email"
             autoCapitalize="none" 
             keyboardType="email-address"
             placeholder="example@gmail.com"
             mode="outlined"
             />

            <TextInput 
             label="Password"
             autoCapitalize="none" 
             keyboardType="email-address"
             mode="outlined"
             />

             <Button> Sign up </Button>
      
        </View>
  
    </KeyboardAvoidingView>
    )
}