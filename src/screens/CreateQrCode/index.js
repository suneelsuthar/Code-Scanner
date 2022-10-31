import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from "react-native";

class CreateQrCode extends React.Component {
  constructor(props) {
    super(props);
    // Linking.openURL(
    //   "https://me-qr.com/?utm_source=qr_scanner&bannerid=7361885358"
    // );
  }

  componentDidMount() {
    this.props.navigation.addListener("tabPress", () => {
      Linking.openURL(
        "https://me-qr.com/?utm_source=qr_scanner&bannerid=7361885358"
      );
    });
  }
  render() {
    return <View style={styles._container}></View>;
  }
}

export default CreateQrCode;

let styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: "white",
  },
});
