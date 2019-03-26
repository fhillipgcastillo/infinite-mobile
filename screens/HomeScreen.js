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
    Billboard: getMovie(_id: "5c71c941d88ff368ee766dfd") {
      id
      title
      year
      covertImage
    }
    lastUpdated: allMovies(
      orderBy: { dateUpdated: -1 }
      limit: $limit
      skip: $skip
    ) {
      id
      title
      year
      covertImage
    }
    mostRecent: allMovies(orderBy: { released: -1 }, limit: 12, skip: 0) {
      id
      title
      year
      covertImage
    }
    mostView: allMovies(
      orderBy: { rating: -1 }
      filter: { released: { from: "2018" } }
      limit: 12
      skip: 0
    ) {
      id
      title
      year
      covertImage
    }
    bestRatings: allMovies(
      orderBy: { view: -1 }
      filter: { released: { from: "2018" } }
      limit: 12
      skip: 0
    ) {
      id
      title
      year
      covertImage
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
    limit: 12,
    data: []
  };
  onFetchMore = fetchMore => {
    var self = this;
    var skip = this.state.skip + this.state.limit;
    self.setState({ skip: skip });

    fetchMore({
      variables: {
        skip: skip,
        limit: this.state.limit
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) return prev;
        var newValue = Object.assign({}, prev, {
          mostRecent: [...prev.mostRecent, ...fetchMoreResult.mostRecent]
        });
        return newValue;
      }
    });
  };
  onSearch = () => {
    if (this.props.fetchMore) {
      this.props.fetchMore({
        variables: {
          skip: 0,
          limit: this.state.limit
        },
        updateQuery: (prev, { fetchMoreResult, ...rest }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        }
      });
    }
  };
  onReflesh = fetchMore =>
    fetchMore({
      variables: {
        skip: this.state.skip + this.state.limit,
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
            <ScrollView
              style={{
                display: "flex",
                flexDirrection: "column",
                flexWrap: "nowrap",
                backgroundColor: "rgba(255,255,255,0.8)"
              }}
            >
              <View
                className="BillBoard"
                style={{ alignAlight: "strech", display: "none" }}
              >
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: data.Billboard ? data.Billboard.covertImage : null
                    }}
                    resizeMode={"cover"}
                    resizeMethod={"scale"}
                    style={{ height: 200, width: 150 }}
                  />
                </TouchableOpacity>
              </View>
              <MovieList
                movies={data.lastUpdated || []}
                onFetchMore={() => this.onFetchMore(fetchMore)}
                onReflesh={() => this.onReflesh(fetchMore)}
                skip={this.state.skip}
                limit={this.limit}
                loading={loading}
                title={"Last Updated"}
                {...this.props}
                style={{ height: 200 }}
              />
              <MovieList
                movies={data.mostRecent || []}
                onFetchMore={() => this.onFetchMore(fetchMore)}
                onReflesh={() => this.onReflesh(fetchMore)}
                skip={this.state.skip}
                limit={this.limit}
                loading={loading}
                title={"Most Recent"}
                {...this.props}
                style={{ height: 200 }}
              />
              <MovieList
                movies={data.mostView || []}
                onFetchMore={() => this.onFetchMore(fetchMore)}
                onReflesh={() => this.onReflesh(fetchMore)}
                skip={this.state.skip}
                limit={this.limit}
                title={"Most View"}
                loading={loading}
                {...this.props}
                style={{ height: 200 }}
              />
              <MovieList
                movies={data.bestRatings || []}
                onFetchMore={() => this.onFetchMore(fetchMore)}
                onReflesh={() => this.onReflesh(fetchMore)}
                skip={this.state.skip}
                limit={this.limit}
                title={"Best Ratings"}
                loading={loading}
                {...this.props}
                style={{ height: 200 }}
              />
              {error ? <Text>{`Error! ${error.message}`}</Text> : null}
              {loading ? (
                <ActivityIndicator
                  animating={loading}
                  style={[styles.centering, { height: 80 }]}
                  size="large"
                />
              ) : null}
            </ScrollView>
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
