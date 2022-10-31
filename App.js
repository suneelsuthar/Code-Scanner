import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation";
import { Provider as PaperProvider } from "react-native-paper";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <PaperProvider>
      <Navigation />
      <FlashMessage position="bottom" />
    </PaperProvider>
  );
}
