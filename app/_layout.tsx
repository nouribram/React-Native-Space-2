import { Stack, useRouter } from "expo-router";
import { useEffect, useState  } from "react";


function RouteGuard({children}: {children: React.ReactNode}) {
 
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const isAuth = false;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuth ){
      router.replace("/auth");
    }
  }, [isMounted]);

 
 return <>{children}</>;
}


export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      </Stack>
    </RouteGuard>
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