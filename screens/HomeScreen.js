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
  query($pageSize: Int!, $currentPage: Int!) {
    topMovies: allMovies(
      orderBy: { released: -1 }
      filter: { released: { from: "2017", to: "2020" } }
      pageSize: $pageSize
      page: $currentPage
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
    var variables = {
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize
    };
    _handleNextPage = () => {};
    return (
      <Query query={queries} variables={variables}>
        {({ loading, error, data, fetchMore, variables }) => {
          // if(variables) console.log(variables);
          if (loading)
            return (
              <ActivityIndicator
                animating={loading}
                style={[styles.centering, { height: 80 }]}
                size="large"
              />
            );
          if(fetchMore){
            console.log("has fetch more");
          }
          if (error) return <Text>{`Error! ${error.message}`}</Text>;
          
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
