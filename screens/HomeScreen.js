import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { MovieList, MoviewPreview } from "../components/Movie";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const apiPath = "http://varnatrd.tech/api";

const queries = gql`
  {
    topMovies: allMovies(
      orderBy: { released: -1 }
      filter: { released: { from: "2017", to: "2020" } }
      pageSize: 10
      page: 1
    ) {
      id
      title
      year
      released
      actors
      rating
      covertImage
      fullImage
      synopsis
      mediaContent
    }
  }
`;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Infinite Entertaiment"
    // header: null
  };
  static MoviesApiPath = `${apiPath}/movies`;

  state = {
    movies: [],
    currentPage: 1,
    pageSize: 10
  };
  componentDidMount() {}
  render() {
    return (
      <Query
        query={queries}
        variables={{
          currentPage: this.state.currentPage,
          pageSize: this.state.pageSize
        }}
      >
        {({ loading, error, data }) => {
          console.log("data", data);
          if (loading)
            return (
              <ActivityIndicator
                animating={loading}
                style={[styles.centering, { height: 80 }]}
                size="large"
              />
            );
          if (error) return <Text>`Error! ${error.message}`</Text>;
          return <MovieList movies={data.topMovies} />;
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  centering: { alignItems: "center", justifyContent: "center", padding: 8 }
});

export default HomeScreen;
