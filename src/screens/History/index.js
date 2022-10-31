import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Clipboard,
  Share,
} from "react-native";
import theme from "../../../theme";
import { FontAwesome } from "@expo/vector-icons";
import { List } from "react-native-paper";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage, hideMessage } from "react-native-flash-message";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      expanded: true,
      RecentlyScanned: [],
      Favourites: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("historyData").then((res) => {
      let data = JSON.parse(res);
      if (data && data.data) {
        this.setState({ RecentlyScanned: data.data });
      }
    });
    AsyncStorage.getItem("Favourites").then((res) => {
      let data = JSON.parse(res);
      if (data && data.data) {
        this.setState({ Favourites: data.data });
      }
    });
  }
  handlePress = () => this.setState({ expanded: !this.state.expanded });
  addFav = async (v) => {
    let { Favourites } = this.state;
    let obj = {
      type: v.type,
      data: v.data,
      date: new Date(),
    };
    var arr = Favourites;
    arr.push(obj);

    await AsyncStorage.setItem("Favourites", JSON.stringify({ data: arr }));
    showMessage({
      message: "Hello World",
      description: "This is our second message",
      type: "success",
    });
  };

  getFavData = () => {
    AsyncStorage.getItem("Favourites").then((res) => {
      let data = JSON.parse(res);
      if (data && data.data) {
        this.setState({ Favourites: data.data });
      }
    });
  };

  delete = async (v, i) => {
    let { Favourites } = this.state;
    var arr = Favourites;
    arr.splice(i, 1);
    await AsyncStorage.setItem("Favourites", JSON.stringify({ data: arr }));
    this.getFavData();
  };

  deleteHistory = async (v, i) => {
    let { RecentlyScanned } = this.state;
    var arr = RecentlyScanned;
    arr.splice(i, 1);
    await AsyncStorage.setItem("historyData", JSON.stringify({ data: arr }));
    AsyncStorage.getItem("historyData").then((res) => {
      let data = JSON.parse(res);
      if (data && data.data) {
        this.setState({ RecentlyScanned: data.data });
      }
    });
  };

  copyToClipboard = (val) => {
    Clipboard.setString(val.data);
    showMessage({
      message: "Copied Successfully",
      description: val.data,
      type: "success",
    });
  };

  onShare = async (val) => {
    try {
      const result = await Share.share({
        message: val.data,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    let { active, expanded, RecentlyScanned, Favourites } = this.state;

    return (
      <View style={styles._container}>
        <View style={styles._tab}>
          <TouchableOpacity
            onPress={() => this.setState({ active: 0 })}
            style={[
              styles._tab_itme,
              { backgroundColor: active === 0 ? theme.white : theme.primary },
            ]}
          >
            <Text style={styles._tab_text}>Recently sccaned</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ active: 1 }), this.getFavData();
            }}
            style={[
              styles._tab_itme,
              { backgroundColor: active === 1 ? theme.white : theme.primary },
            ]}
          >
            <FontAwesome name="star" size={18} color="black" />
            <Text style={styles._tab_text}>
              Favourites({Favourites.length})
            </Text>
          </TouchableOpacity>
        </View>
        {/* recently scanned data */}
        <List.Section style={{ backgroundColor: theme.white, marginTop: 40 }}>
          {active === 0
            ? RecentlyScanned.map((val, i) => {
                return (
                  <List.Accordion
                    style={{
                      backgroundColor: theme.white,
                      borderTopWidth: 1.5,
                      borderColor: theme.primary,
                    }}
                    key={i}
                    title={
                      <View>
                        <Text style={styles._url}>{val.data}</Text>
                        <Text style={styles._date}>{val.date.toString()}</Text>
                      </View>
                    }
                    left={(props) => (
                      <MaterialCommunityIcons
                        name="file-document-outline"
                        size={24}
                        color={theme.grey}
                      />
                    )}
                    descriptionNumberOfLines={1}
                  >
                    {/* <List.Item title="First item" />
                <List.Item title="Second item" /> */}
                    <View style={styles._description_row}>
                      <TouchableOpacity
                        style={styles._icon_view}
                        onPress={() => this.onShare(val)}
                      >
                        <Entypo
                          name="share-alternative"
                          size={18}
                          color="black"
                        />
                        <Text style={styles._option_text}>Share</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles._icon_view}
                        onPress={() => this.copyToClipboard(val)}
                      >
                        <MaterialIcons
                          name="content-copy"
                          size={18}
                          color="black"
                        />
                        <Text style={styles._option_text}>Copy</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles._icon_view}
                        onPress={() => this.addFav(val, i)}
                      >
                        <FontAwesome name="star" size={18} color="black" />
                        <Text style={styles._option_text}>
                          Add to favourites
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles._icon_view}
                        onPress={() => this.deleteHistory(val, i)}
                      >
                        <AntDesign name="delete" size={18} color="black" />
                        <Text style={styles._option_text}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </List.Accordion>
                );
              })
            : Favourites.map((val, i) => {
                return (
                  <List.Accordion
                    style={{
                      backgroundColor: theme.white,
                      borderTopWidth: 1.5,
                      borderColor: theme.primary,
                    }}
                    key={i}
                    title={
                      <View>
                        <Text style={styles._url}>{val.data}</Text>
                        <Text style={styles._date}>{val.date}</Text>
                      </View>
                    }
                    left={(props) => (
                      <MaterialCommunityIcons
                        name="file-document-outline"
                        size={24}
                        color={theme.grey}
                      />
                    )}
                    descriptionNumberOfLines={1}
                  >
                    {/* <List.Item title="First item" />
                <List.Item title="Second item" /> */}
                    <View style={styles._description_row}>
                      <TouchableOpacity
                        style={styles._icon_view}
                        onPress={() => this.onShare(val)}
                      >
                        <Entypo
                          name="share-alternative"
                          size={18}
                          color="black"
                        />
                        <Text style={styles._option_text}>Share</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles._icon_view}
                        onPress={() => this.copyToClipboard(val, i)}
                      >
                        <MaterialIcons
                          name="content-copy"
                          size={18}
                          color="black"
                        />
                        <Text style={styles._option_text}>Copy</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles._icon_view}
                        onPress={() => this.delete(val, i)}
                      >
                        <AntDesign name="delete" size={18} color="black" />
                        <Text style={styles._option_text}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </List.Accordion>
                );
              })}
        </List.Section>
      </View>
    );
  }
}

export default History;

let styles = StyleSheet.create({
  _container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
    elevation: 4,
  },
  _tab: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
  },
  _tab_itme: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    height: 35,
    borderRadius: 10,
    flexDirection: "row",
  },
  _tab_text: {
    fontWeight: "bold",
  },
  _url: {
    fontWeight: "bold",
  },
  _date: {
    color: theme.grey,
    fontSize: 12,
  },
  _description_row: {
    flexDirection: "row",
    borderColor: "red",
    justifyContent: "flex-start",
    paddingLeft: 0,
  },

  _icon_view: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 3,
  },
  _option_text: {
    fontSize: 10,
    paddingTop: 5,
  },
});
