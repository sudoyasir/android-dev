import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MagnifyingGlassIcon,
  ChevronDoubleRightIcon,
} from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";

export default function Welcome({navigation}) {
  const [loading, setLoading] = useState(false);
  const Stack = createNativeStackNavigator();

    const handlePress = () => {
      navigation.navigate('Home');
    };

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.jpg")}
        className="absolute w-full h-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail
            thickness={4}
            size={100}
            color={["#F44336", "#2196F3", "#009688"]}
            direction="clockwise"
          />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* search section */}
          <View className="items-center justify- py-10">
            <View className="py-20">
              <Image source={require("../assets/clouds-welcome-page.png")} />
              <Text
                styles="text"
                className="text-3xl text-center font-bold mt-5 text-white"
              >
                Find Your Weather Predictions
              </Text>
              <Text styles="text" className=" text-center mt-5 text-gray-300">
                Get to know your weather map & radar{"\n"} preciption forecast
              </Text>
              <View className="mx-auto mt-10 p-5" style={style.hello}>
                <TouchableOpacity
                  className="rounded-full"
                  onPress={handlePress}
                >
                  <View
                    style={style.circle1}
                    className=" w-28 h-28 rounded-full items-center justify-center"
                  >
                    <View
                      style={style.circle2}
                      className="h-24 w-24 rounded-full items-center justify-center"
                    >
                      <View
                        style={style.circle2}
                        className="h-20 w-20 rounded-full items-center justify-center"
                      >
                        <View className="bg-purple-600 w-16 h-16 rounded-full items-center justify-center">
                          <ChevronDoubleRightIcon size="25" color="white" />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  circle1: {
    borderColor: "gray", // Border color
    borderWidth: 1, // Border width
    borderStyle: "solid",
    padding: 20,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 }, // Adjust shadow offset as needed
    shadowRadius: 10, // Adjust shadow radius as needed
    shadowOpacity: 0.5,
  },
  circle2: {
    borderColor: "#7f7f7f",
    borderWidth: 1,
    borderStyle: "solid",
  },
  circle3: {
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
  },
});
