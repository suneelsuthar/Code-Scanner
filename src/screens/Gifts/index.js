import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import theme from "../../../theme";
class Gifts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
    };
  }
  render() {
    let { active } = this.state;
    return (
      <View style={styles._container}>
        <View style={styles._tab}>
          <TouchableOpacity
            onPress={() => this.setState({ active: 0 })}
            style={[
              styles._tab_itme,
              { backgroundColor: active === 0 ? "white" : theme.primary },
            ]}
          >
            <Text style={styles._tab_text}>Your Gifts 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ active: 1 })}
            style={[
              styles._tab_itme,
              { backgroundColor: active === 1 ? "white" : "#e5e5e5" },
            ]}
          >
            <Text style={styles._tab_text}>Categories</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {active === 0 ? (
            <View>
              <View style={styles._gift_card}>
                <View
                  style={[
                    styles._row,
                    { borderBottomWidth: 1, borderColor: theme.primary },
                  ]}
                >
                  <View>
                    <Text style={styles._h1}>7% off Sport & Outdoor</Text>
                    <Text style={styles._label}>Expires at Jul 1st, 2022</Text>
                  </View>
                  <TouchableOpacity style={styles._gift_btn}>
                    <Text style={styles._btn_text}>Use Gift</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles._row, { paddingVertical: 0 }]}>
                  <Image
                    style={styles._logo}
                    source={{
                      url: "https://static.tomtop.com/tomtop/icon/logo.png",
                    }}
                  />
                  <Text style={{ color: theme.grey }}>http://tomtop.com/</Text>
                </View>
                <TouchableOpacity style={styles._promot_btn}>
                  <Text style={styles._promot_btn_text}>
                    Promote code: ADM07
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles._heading}>Gift categories</Text>
              <Text style={styles._desc}>
                Select the product categories for which you want to receive gift
              </Text>
              <View style={styles._categories_section}>
                <Text style={styles._empty}>No categories available</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default Gifts;

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
    marginBottom: 20,
  },
  _tab_itme: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    height: 35,
    borderRadius: 10,
  },
  _tab_text: {
    fontWeight: "bold",
  },
  _gift_card: {
    borderWidth: 1.5,
    borderColor: theme.primary,
    borderRadius: 3,
    padding: 10,
  },
  _row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  _gift_btn: {
    backgroundColor: theme.fillcolor,
    borderRadius: 100,
    padding: 5,
    paddingHorizontal: 10,
  },
  _btn_text: {
    color: "white",
  },
  _h1: {
    fontWeight: "bold",
    fontSize: 15,
  },
  _label: {
    color: theme.grey,
  },
  _promot_btn: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 100,
    padding: 6,
    paddingHorizontal: 15,
  },
  _promot_btn_text: {
    fontWeight: "bold",
    fontSize: 12,
    width: 200,
    textAlign: "center",
  },
  _logo: {
    height: 50,
    width: 150,
  },
  _heading: {
    fontWeight: "bold",
    fontSize: 22,
  },
  _desc: {
    color: theme.grey,
    paddingTop: 20,
  },
  _categories_section: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,

    // borderWidth:2
  },
  _empty: {
    color: theme.grey,
  },
});
