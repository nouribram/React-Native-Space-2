import { KeyboardAvoidingView, StyleSheet, Platform, View} from "react-native";
import {Text, Button, TextInput, useTheme} from "react-native-paper";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/lib/auth-context";

export default function AuthScreen() {
  
  const [isSignUp, setIsSignup ] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>("")
  const theme = useTheme();
  const router = useRouter();

  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
     if (!email || !password) {
         setError("please fill it");
         return;
     }

     if (password.length < 6) {
        setError("password must be at least 6 characters long.");
        return;
     }

     setError(null);

     if (isSignUp) {
        const error = await signUp(email, password);
        if (error) {
            setError(error)
            return 
        }
     } else {
        const error =  await signIn(email, password);
        if (error) {
            setError(error);
            return;
        }

        router.replace("/");
     }
  };

  const  handleSwitchMode = () => {
     setIsSignup((prev) => !prev);
  }
  
  return ( 
    <KeyboardAvoidingView 
    
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>

        <View style={styles.content}>
            <Text style={styles.title} variant="headlineMedium"> 
                {isSignUp ? "Create Account" : "Welcome back"}
            </Text>
             
             <TextInput 
             label="Email"
             autoCapitalize="none" 
             keyboardType="email-address"
             placeholder="example@gmail.com"
             mode="outlined"
             style={styles.input}
             onChangeText={setEmail}
             />

            <TextInput 
             label="Password"
             autoCapitalize="none" 
             mode="outlined"
             secureTextEntry
             style={styles.input}
             onChangeText={setPassword}
             />

             {error && <Text style={{ color: theme.colors.error}}>{error}</Text>}

             <Button mode="contained" style={styles.button} onPress={handleAuth}>
                 {isSignUp ? "Sign Up" : "Log in"} 
            </Button>
             
             <Button 
             mode="text"
            onPress={handleSwitchMode} 
            style={styles.switchModeButton}> 
            {isSignUp ? "Already have an account ? sign in" : "do not have an account sign up"}</Button>

        </View>
  
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
   },
   content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
   },
   title: {
    textAlign: "center",
    marginBottom: 24,
   },
   input: {
    marginBottom: 16,
   },
   button: {
    marginTop: 8,
   },
   switchModeButton: {
     marginTop: 16,
   },

});

/* 

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID!;
const HABITS_COLLECTION_ID = process.env.EXPO_PUBLIC_HABITS_DB_ID!;
*/