import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  Vibration,
  SafeAreaView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import Torch from "react-native-torch";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [image, setImage] = useState(null);
  const [isVibrate, setVibrate] = useState(true);
  const [history, setHistory] = useState(true);
  const [dataArr, setData] = useState([]);

  const fetchData = () => {
    AsyncStorage.getItem("vibrate").then((res) => {
      let vibrate = JSON.parse(res);
      if (vibrate) {
        setVibrate(vibrate);
      }
    });

    AsyncStorage.getItem("history").then((res) => {
      let history = JSON.parse(res);
      if (history) {
        setHistory(history);
      }
    });

    AsyncStorage.getItem("historyData").then((res) => {
      let data = JSON.parse(res);
      if (data && data.data) {
        setData(data.data);
      }
    });
  };
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    fetchData();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (isVibrate === true) {
      Vibration.vibrate();
    }
    if (history) {
      let obj = {
        type,
        data,
        date: new Date(),
      };
      var arr = dataArr;
      arr.push(obj);
      setScanned(true);

      await AsyncStorage.setItem("historyData", JSON.stringify({ data: arr }));
    }
    navigation.navigate("History");
  };

  const readQRFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      includeBase64: true,
      selectionLimit: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const _handlePress = () => {
    setIsTorchOn(!isTorchOn);
    Torch.switchState(!isTorchOn);
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  console.log(">>>>>datadata>>>>>>>>>", dataArr);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles._overlay_layer}>
        <Image
          source={require("./../../../assets/scanner.png")}
          style={styles._qr_image}
        />
        {/* <View style={styles._btn_row}>
          <TouchableOpacity
            style={styles._circle}
            activeOpacity={0.8}
            onPress={() => _handlePress()}
          >
            <Entypo name="light-up" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles._circle}
            onPress={() => readQRFromGallery()}
          >
            <MaterialCommunityIcons
              name="tooltip-image-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View> */}
        {/* <Slider
          style={{ width: 200, height: 40, marginTop: 60 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#018474"
          maximumTrackTintColor="#000000"
        /> */}
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? handleBarCodeScanned : handleBarCodeScanned}
        style={styles._qr_layer}
      />

      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "grey",
  },
  _qr_image: {
    height: 200,
    width: 200,
  },
  _overlay_layer: {
    position: "absolute",
    // zIndex: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: windowWidth,
    height: windowHeight,
    // backgroundColor: "grey",
  },
  _qr_layer: {
    width: windowWidth,
    height: windowHeight,
    zIndex: -1,
  },
  _btn_row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  _circle: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "#827e7f",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
