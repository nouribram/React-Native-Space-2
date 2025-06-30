import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState  } from "react";
import { AuthProvider, useAuth} from "@/lib/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import {GesturedHandlerRootView}  from 'react-native-gesture-handler' calculating...


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
    <GesturedHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <PaperProvider>
          <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
    </GesturedHandlerRootView>
  );
}

