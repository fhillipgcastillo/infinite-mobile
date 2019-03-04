import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl
} from "react-native";
import MoviewPreview from "./MoviePreview";

export default class MovieList extends Component {
  state = { movies: [], currentPage: 1, pageSize: 10, isLoading: false };
  componentDidMount() {
    this.setState({ movies: this.props.movies || [] });
    // this.setState({ currentPage: this.props.currentPage || 1 });
    // this.setState({ pageSize: this.props.pageSize || 10 });
  };
  onFetchMore = this.props.onFetchMore;
  onRefresh = () => {
    console.log("refleshing");
    this.setState({ isLoading: false, movies: [] });
    this.props.fetchMore({
      variables: { ...this.state.currentPage, ...this.state.pageSize },
      updateQuery: this.onFetchMore
    });
  };
  render() {
    return (
      <ScrollView
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
        {this.state.movies
          ? this.state.movies
              .sort((va, vb) => vb.year - va.year)
              .map((movie, index) => (
                <MoviewPreview key={index} movie={movie} />
              ))
          : null}
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#ccc",
    padding: 10,
    display: "flex"
  }
});
