import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
  Button
} from "react-native";
import MoviewPreview from "./MoviePreview";

export default class MovieList extends Component {
  state = { movies: [], currentPage: 1, pageSize: 10, isLoading: false };
  componentDidMount() {
  };
  onFetchMore = this.props.onFetchMore;
  onRefresh = this.props.onReflesh;
  render() {
    return (
      <ScrollView
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.onRefresh}
          />
        }
      >
        {this.props.movies.map((movie, index) => (
          <MoviewPreview key={index} movie={movie} onDetailPress={this.props.onDetailPress} {...this.props} />
        ))}
        <View className="pagination" style={styles.pagination}>
          <Button onPress={this.onFetchMore} title="Next" />
        </View>
      </ScrollView>
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
