import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState  } from "react";
import { AuthProvider, useAuth} from "@/lib/auth-context";

function RouteGuard({ children } : { children: React.ReactNode }) {
 
  const router = useRouter();
 // const [isMounted, setIsounted] = useState(false);
  const { user, isLoadingUser } = useAuth();
  const segment = useSegments()
  
  useEffect(() => {
    const inAuthGroup = segment[0] === "auth";
   
    if (!user && !inAuthGroup && !isLoadingUser) {
       router.replace("/auth");
    } else if(user && inAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments]);

 return <>{children}</>;

}


export default function RootLayout() {
  return (
    <AuthProvider>
        <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
    
  );
}



/*
app write.ts

import { Client } from "react-native-appwrite";

const client = new Client()
.setEndpoint("https://fra.cloud.appwrite.io/v1")
.setProject("6847c50f003853827abc")
.setPlatform("com.habit-tracker-app")

*/