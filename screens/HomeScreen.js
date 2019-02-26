import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
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
    movies: []
  };
  componentDidMount() {  }
  render() {
    return (
      <Query query={queries}>
        {({ loading, error, data }) => {
          if (loading) return( <Text>Loading...</Text>);
          if (error) return (<Text>`Error! ${error.message}`</Text>);
          return <MovieList movies={data.topMovies} />
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default HomeScreen;
