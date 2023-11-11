import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") {
      Alert.alert("Abbay Gandu!", "Koi task to day mjhay. 🙄");
      return;
    }
    setTodos([
      ...todos,
      { id: Date.now().toString(), text: input, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="New To-Do"
      />
      <View style={styles.buttonContainer}>
        <Button title="Add To-Do" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={
                item.completed ? [styles.text, styles.completed] : styles.text
              }
            >
              {item.text.length > 35
                ? `${item.text.substring(0, 35)}...`
                : item.text}
            </Text>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <MaterialCommunityIcons
                name={
                  item.completed ? "checkbox-marked" : "checkbox-blank-outline"
                }
                size={24}
                color={item.completed ? "green" : "black"}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color="red"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20, // Modify the padding as needed
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20, // Add margin bottom to the button container
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
  text: {
    width: 200, // Set a fixed width for the text
  },
  completed: {
    textDecorationLine: "line-through",
  },
  icon: {
    marginLeft: 10,
  },
});
