import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import { List } from "react-native-paper";
import { Switch } from "react-native-paper";
import theme from "../../../theme";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wibrate: true,
      isSave: true,
    };
  }

  vibrateSetting = async () => {
    let { wibrate } = this.state;
    this.setState({ wibrate: !wibrate });
    await AsyncStorage.setItem("vibrate", JSON.stringify({ vibrate: wibrate }));
  };

  saveHistory = async () => {
    let { wibrate, isSave } = this.state;
    this.setState({ isSave: !isSave });
    await AsyncStorage.setItem("history", JSON.stringify({ isSave: isSave }));
  };

  render() {
    let { wibrate, isSave } = this.state;
    return (
      <View style={styles._container}>
        <View style={styles.list_layer}>
          <List.Item
            title="Vibrate"
            titleStyle={styles._title}
            style={styles._list}
            right={(props) => (
              <Switch
                value={wibrate}
                onValueChange={() => this.vibrateSetting()}
                color={theme.secondary}
              />
            )}
          />
          <List.Item
            title="Save to history"
            titleStyle={styles._title}
            style={styles._list}
            right={(props) => (
              <Switch
                value={isSave}
                onValueChange={() => this.saveHistory()}
                color={theme.secondary}
              />
            )}
          />

          <List.Item
            style={[styles._list, { marginTop: 20 }]}
            title="Help"
            titleStyle={styles._title}
            onPress={() =>
              Linking.openURL(
                "https://me-qr-scanner.com/?utm_source=qr_scanner"
              )
            }
            right={(props) => (
              <Feather name="help-circle" size={24} color={theme.primary} />
            )}
          />
          <List.Item
            style={styles._list}
            titleStyle={styles._title}
            title="Write Us a feedback"
            onPress={() =>
              Linking.openURL(
                "https://me-qr-scanner.com/?utm_source=qr_scanner"
              )
            }
            right={(props) => (
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={24}
                color={theme.primary}
              />
            )}
          />
          <List.Item
            style={styles._list}
            title="Rate us"
            titleStyle={styles._title}
            onPress={() =>
              Linking.openURL("https://play.google.com/store/apps")
            }
            // https://play.google.com/store/apps
            right={(props) => (
              <AntDesign name="star" size={24} color={theme.grey} />
            )}
          />
        </View>
        <Text style={styles._version}>3.0.5</Text>
      </View>
    );
  }
}

export default Setting;

let styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: "white",
    elevation: 4,
  },
  _list: {
    borderBottomWidth: 1,
    borderColor: theme.primary,
  },
  _title: {
    fontWeight: "500",
  },
  list_layer: {
    flex: 1,
  },
  _version: {
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
  },
});
