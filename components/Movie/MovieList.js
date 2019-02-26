import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import MoviewPreview from "./MoviePreview";

export default class MovieList extends Component {
  state = { movies: [] };
  componentDidMount() {
    this.setState({ movies: this.props.movies || [] });
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
