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
          .sort((va, vb) => vb.year - va.year)
          .slice(0, 11)
          .map(movie => (
            <MoviewPreview key={movie._id} movie={movie} />
          ))}
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
