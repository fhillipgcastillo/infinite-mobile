import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { MovieList, MoviewPreview } from "../components/Movie";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const apiPath = "http://varnatrd.tech/api";

const queries = gql`
  query($limit: Int!, $skip: Int!) {
    topMovies: allMovies(
      orderBy: { released: -1 }
      filter: { released: { from: "2017", to: "2020" } }
      limit: $limit
      skip: $skip
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
    skip: 0,
    limit: 10,
    data: []
  };
  onFetchMore = fetchMore => {
    var self = this;
    var skip = this.state.skip+this.state.limit;
    self.setState({skip: skip});

    fetchMore({
      variables: {
        skip: skip,
        limit: this.state.limit
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) return prev;
        var newValue = Object.assign({}, prev, {
          topMovies: [...prev.topMovies, ...fetchMoreResult.topMovies]
        });
        return newValue;
      }
    });
  }
  onReflesh = fetchMore => fetchMore({
    variables: {
      skip: this.state.skip+this.state.limit,
      limit: this.state.limit
    },
    updateQuery: (prev, { fetchMoreResult, ...rest }) => {
      if (!fetchMoreResult) return prev;
      return fetchMoreResult;
    }
  });
  render() {
    let variables = {
      skip: this.state.skip,
      limit: this.state.limit
    };

    return (
      <Query query={queries} variables={variables}>
        {({ loading, error, data, fetchMore, variables }) => {
          return (
            <View>
              <MovieList
                movies={data.topMovies || []}
                onFetchMore={() => this.onFetchMore(fetchMore)}
                onReflesh={() => this.onReflesh(fetchMore)}
                skip={this.state.skip}
                limit={this.limit}
                loading={loading || false}
                onDetailPress={()=>this.props.navigation.navigate('Details')}
              />
              {error ? <Text>{`Error! ${error.message}`}</Text> : null}
              {loading 
              ? <ActivityIndicator
                  animating={loading}
                  style={[styles.centering, { height: 80 }]}
                  size="large"
                />
               : null}
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  centering: { alignItems: "center", justifyContent: "center", padding: 8 }
});

export default HomeScreen;
