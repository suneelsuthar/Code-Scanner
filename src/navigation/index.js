// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreateQrCode, Gifts, History, Scan, Setting } from "./../screens";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icons;
          if (route.name === "Scan") {
            icons = <AntDesign name="scan1" size={size} color={color} />;
          } else if (route.name === "History") {
            icons = (
              <MaterialIcons name="access-time" size={size} color={color} />
            );
          } else if (route.name === "CreateQrCode") {
            icons = (
              <Ionicons
                name="ios-add-circle-outline"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Gifts") {
            icons = (
              <MaterialCommunityIcons name="gift" size={size} color={color} />
            );
          } else if (route.name === "Setting") {
            icons = <AntDesign name="setting" size={size} color={color} />;
          }
          return icons;
        },
        tabBarActiveTintColor: "gray",
        // tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen
        name="CreateQrCode"
        component={CreateQrCode}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Gifts" component={Gifts} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
