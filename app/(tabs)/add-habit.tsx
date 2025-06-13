import { Background } from "@react-navigation/elements";
import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { Databases } from "react-native-appwrite";

const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)(number);
export default function AddHabitScreen() {
    const [title, setTitle] = useState<string>("");
    const [Description, setDescription] = useState<string>("");
    const [frequency, setFrequency] = useState<Frequency>("daily");
    const {user} = useAuth()
    const handleSubmit = async () => {
        if (!user) return;
        await databases.createDocument(DATABASE_ID, HABITS_COLLECTION_ID, ID.unique())
    }
    return (
        <View style={styles.container}>
            <TextInput label="Title" mode="outlined" onChangeText={setTitle} style={styles.input} />
            <TextInput label="Description" mode="outlined"  style={styles.input}/>
               <View style={styles.frequencyContainer}>
                 <SegmentedButtons
                    value={frequency}
                    onValueChange={(value) => setFrequency(value as Frequency)}
                    buttons={FREQUENCIES.map((freq) => ({
                    value: freq,
                    label: freq.charAt(0).toUpperCase() + freq.slice(1),
                }))}
                />
               </View>
               <Button mode="contained" onPress={handleSubmit} disabled={!title || !description}>
                Add Habit
               </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
    },

    input: {
        marginBottom: 16,
    },

    frequencyContainer: {
        marginBottom: 24,
    },

  
});