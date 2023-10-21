import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";

export default function Home() {
  return (
    <View className="flex-1 relative ">
      <StatusBar style="light" />
      <Image
        source={require("../assets/bg.jpg")}
        className="absolut w-full h-full"
        blurRadius={70}
      />
      <SafeAreaView className="flex flex-1">
        {/* Search Section */}
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{ backgroundColor: theme.bgWhite(0.2) }}
          >
            <TextInput
              placeholder="Search City"
              placeholderTextColor={"lightgray"}
              className="p-6 h-10 flex-1 text-base text-white"
            />
            <TouchableOpacity
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            ></TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
