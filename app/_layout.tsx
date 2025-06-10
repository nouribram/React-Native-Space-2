import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
       <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
    </Stack>
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