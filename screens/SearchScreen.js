import React, { Component } from "react";
import { View, Platform, TextInput, Text } from "react-native";
import TabBarIcon from "../components/TabBarIcon";

class HeaderComponent extends Component {
  state = {
    search: "'"
  };
  searchText = text => {
    this.setState({ search: text });
    // text && "search"
  };
  render() {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TabBarIcon name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
        <TextInput
          onChangeText={this.searchText}
          value={this.props.search}
          style={{
            borderWidth: 1,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: 26,
            padding: 5,
            fontSize: 16,
            borderColor: "#c8c8c8",
            flex: 1
          }}
        />
      </View>
    );
  };
};

class SearchScreen extends Component {
  state = {
    search: ""
  };
  static navigationOptions = ({ navigation }) => {
    return {
      // headerTransparent: true,
      // headerBackground: "rgba(123, 126, 130, 0.53)",
      headerTitle:"Discover"
      // header: <HeaderComponent {...this.props} />
    };
  };

  searchText = text => {
    this.setState({ search: text });
  };
  render() {
    return (
      <View>
        <HeaderComponent {...this.props} />
        <Text>Content</Text>
      </View>
    );
  }
}

export default SearchScreen;
