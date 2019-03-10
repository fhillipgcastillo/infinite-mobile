import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
  Button,
  FlatList
} from "react-native";
import MoviewPreview from "./MoviePreview";

export default class MovieList extends Component {
  state = { movies: [], currentPage: 1, pageSize: 10, isLoading: false };
  componentDidMount() {
    if (this.props.loading) this.setState({ isLoading: this.props.loading });
  }
  onFetchMore = this.props.onFetchMore;
  onRefresh = this.props.onReflesh;
  handleScroll = ({ nativeEvent }) => {
    if (
      nativeEvent.contentOffset.y >=
        nativeEvent.contentSize.height -
          nativeEvent.layoutMeasurement.height * 2 &&
      nativeEvent.contentOffset.y <= nativeEvent.contentSize.height &&
      !this.props.loading
    ) {
      this.onFetchMore();
      console.log("do reload");
    }
    // console.log("loading", this.props.loading);
  };
  handleScrollEnd = SyntheticEvent => {};
  render() {
    let props = this.props;
    return (
      <FlatList
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.onRefresh}
          />
        }
        onScroll={this.handleScroll}
        onScrollEndDrag={this.handleScrollEnd}
        pagingEnabled={true}
        overScrollMode="always"
        data={this.props.movies}
        keyExtractor={(item, index) => item.id}
        renderItem={({ index, item, separators }) => (
          <MoviewPreview
            key={index}
            movie={item}
            onDetailPress={() => props.navigation.navigate("Details")}
            navigation={props.navigation}
          />
        )}
      />
    );
  }
}

let styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#ccc",
    padding: 10,
    display: "flex"
  },
  pagination: {
    display: "flex",
    width: 50
  }
});
