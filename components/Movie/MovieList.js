import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import MoviewPreview from "./MoviePreview";

export default class MovieList extends Component {
  state = { movies: [],currentPage:1, pageSize: 10 };
  componentDidMount() {
    this.setState({ movies: this.props.movies || [] });
    // this.setState({ currentPage: this.props.currentPage || 1 });
    // this.setState({ pageSize: this.props.pageSize || 10 });
  }
  render() {
    return (
      <ScrollView style={styles.listContainer}>
        {this.state.movies
          ? this.state.movies
              .sort((va, vb) => vb.year - va.year)
              .map((movie, index) => <MoviewPreview key={index} movie={movie} />)
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
