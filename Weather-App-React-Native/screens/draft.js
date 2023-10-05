import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard,
  } from "react-native";
  import React, { useCallback, useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
  import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
  import { debounce } from "lodash";
  import { theme } from "../theme";
  import { fetchLocations, fetchWeatherForecast } from "../api/weather";
  import * as Progress from "react-native-progress";
  import { StatusBar } from "expo-status-bar";
  import { weatherImages } from "../constants";
  import { getData, storeData } from "../utils/asyncStorage";
  
  export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState({});
  
    const handleSearch = (search) => {
      // console.log('value: ',search);
      if (search && search.length > 2)
        fetchLocations({ cityName: search }).then((data) => {
          // console.log('got locations: ',data);
          setLocations(data);
        });
    };
  
    const handleLocation = (loc) => {
      setLoading(true);
      toggleSearch(false);
      setLocations([]);
      fetchWeatherForecast({
        cityName: loc.name,
        days: "7",
      }).then((data) => {
        setLoading(false);
        setWeather(data);
        storeData("city", loc.name);
      });
    };
  
    useEffect(() => {
      fetchMyWeatherData();
    }, []);
  
    const fetchMyWeatherData = async () => {
      let myCity = await getData("city");
      let cityName = "Islamabad";
      if (myCity) {
        cityName = myCity;
      }
      fetchWeatherForecast({
        cityName,
        days: "7",
      }).then((data) => {
        // console.log('got data: ',data.forecast.forecastday);
        setWeather(data);
        setLoading(false);
      });
    };
  
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  
    const { location, current } = weather;
  
    return (
      <KeyboardAwareScrollView
      keyboardShouldPersistTaps= 'always'
      style= {{ flex:1 }} 
        // className="flex-1 relative"
      >
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
          <SafeAreaView style={{ flex: 1 }}>
            {/* search section */}
            <View style={{ height: "7%" }} className="mx-4 relative z-50">
              <View
                className="flex-row justify-end items-center rounded-full"
                style={{
                  backgroundColor: showSearch
                    ? theme.bgWhite(0.2)
                    : "transparent",
                }}
              >
                {showSearch ? (
                  <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search city"
                    placeholderTextColor={"lightgray"}
                    className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                  />
                ) : null}
                <TouchableOpacity
                  onPress={() => toggleSearch(!showSearch)}
                  className="rounded-full p-3 m-1"
                  style={{ backgroundColor: theme.bgWhite(0.3) }}
                >
                  {showSearch ? (
                    <XMarkIcon size="25" color="white" />
                  ) : (
                    <MagnifyingGlassIcon size="25" color="white" />
                  )}
                </TouchableOpacity>
              </View>
              {locations.length > 0 && showSearch ? (
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
                  {locations.map((loc, index) => {
                    let showBorder = index + 1 != locations.length;
                    let borderClass = showBorder
                      ? " border-b-2 border-b-gray-400"
                      : "";
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleLocation(loc)}
                        className={
                          "flex-row items-center border-0 p-3 px-4 mb-1 " +
                          borderClass
                        }
                      >
                        <MapPinIcon size="20" color="gray" />
                        <Text className="text-black text-lg ml-2">
                          {loc?.name}, {loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
  
            {/* forecast section */}
            <View className="mx-4 flex justify-around flex-1 mb-2 fixed">
              {/* location */}
              <Text className="text-white text-center text-2xl font-bold">
                {location?.name},
                <Text className="text-lg font-semibold text-gray-300">
                  {location?.country}
                </Text>
              </Text>
              {/* weather icon */}
              <View className="flex-row justify-center">
                <Image
                  // source={{uri: 'https:'+current?.condition?.icon}}
                  source={weatherImages[current?.condition?.text || "other"]}
                  className="w-52 h-52"
                />
              </View>
              {/* degree celcius */}
              <View className="space-y-2">
                <Text className="text-center font-bold text-white text-6xl ml-5">
                  {current?.temp_c}&#176;
                </Text>
                <Text className="text-center text-white text-xl tracking-widest">
                  {current?.condition?.text}
                </Text>
              </View>
  
              {/* other stats */}
              <View className="flex-row justify-between mx-4">
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/icons/wind.png")}
                    className="w-6 h-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.wind_kph}km
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/icons/drop.png")}
                    className="w-6 h-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.humidity}%
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/icons/sun.png")}
                    className="w-6 h-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            </View>
  
            {/* forecast for next days */}
            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-5 space-x-2">
                <CalendarDaysIcon size="22" color="white" />
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {weather?.forecast?.forecastday?.map((item, index) => {
                  const date = new Date(item.date);
                  const options = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(",")[0];
  
                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                      style={{ backgroundColor: theme.bgWhite(0.15) }}
                    >
                      <Image
                        // source={{uri: 'https:'+item?.day?.condition?.icon}}
                        source={
                          weatherImages[item?.day?.condition?.text || "other"]
                        }
                        className="w-11 h-11"
                      />
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        )}
      </KeyboardAwareScrollView>
    );
  }
  