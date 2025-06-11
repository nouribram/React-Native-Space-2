import { KeyboardAvoidingView, Platform, View} from "react-native";
import {Text, Button, TextInput} from "react-native-paper";
import { useState } from "react";

export default function AuthScreen() {
  
  const [isSignUp,setIsSignup ] = useState<boolean>(false);
  
  const  handleSwitchMode = () => {
     setIsSignup((prev) => !prev)    
  }
  
  return ( 
    <KeyboardAvoidingView 
    
    behavior={Platform.OS === "ios" ? "padding" : "height"}>

        <View>
            <Text> {isSignUp ? "Create Account" : "Welcome back"}</Text>
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

             <Button mode="contained"> {isSignUp ? "Sign Up" : "Log in"} </Button>
             <Button mode="text" onPress={handleSwitchMode}> {isSignUp ? "Already have an account ? sign in" : "do not have an account sign up"}</Button>

        </View>
  
    </KeyboardAvoidingView>
    )
}