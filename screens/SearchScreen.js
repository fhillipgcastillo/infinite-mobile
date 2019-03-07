import React, { Component } from "react";
import {
  View,
  Platform,
  TextInput,
  Text,
  ScrollView,
  TouchableHighlight
} from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MovieList from "../components/Movie/MovieList";

const SEARCH_QUERY = gql`
  query($search: String, $limit: Int, $skip: Int) {
    Movies: allMovies(filter: { search: $search }, limit: $limit, skip: $skip) {
      id
      title
      year
      covertImage
    }
  }
`;

class SearchScreen extends Component {
  state = {
    search: "",
    skip: 0,
    limit: 10,
    searching: false
  };
  static navigationOptions = ({ navigation }) => {
    return {
      // headerTransparent: true,
      // headerBackground: "rgba(123, 126, 130, 0.53)",
      headerTitle: "Discovery"
      // header: <HeaderComponent {...this.props} />
    };
  };
  handleInputChanged = text => {
    this.setState({ search: text, skip: 0, limit: 10 });
  };
  searchText = fetchMore => {
    // this.setState({ search: text });
    console.log("doing search", this.state.searching);

    // if (!this.state.searching) {
    this.setState({ searching: true });
    console.log("doing search");
    this.reDoSearch(fetchMore);
    // }
  };
  reDoSearch = fetchMore => {
    let variables = {
      search: this.state.search.trim(),
      limit: this.state.limit,
      skip: this.state.skip
    };
    let self = this;
    console.log("variables", variables);
    fetchMore({
      variables: variables,
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        self.setState({ searching: false });
        if (!fetchMoreResult) return prev;
        console.log("gotData");
        return fetchMoreResult;
      }
    });
  };

  render() {
    return (
      <View>
        <Query
          query={SEARCH_QUERY}
          variables={{
            search: this.state.search || null,
            limit: this.state.limit,
            skip: this.state.skip
          }}
        >
          {({ loading, error, data, fetchMore, variables }) => {
            return (
              <View>
                {/* <HeaderComponent {...this.props} {...fetchMore} doSearch={this.searchText} /> */}
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TabBarIcon
                      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                      style={{ padding: 10 }}
                    />
                  
                  <TextInput
                    onChangeText={this.handleInputChanged}
                    value={this.state.search}
                    style={{
                      borderWidth: 1,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      marginLeft: 5,
                      height: 30,
                      padding: 5,
                      fontSize: 16,
                      borderColor: "#c8c8c8",
                      flex: 1
                    }}
                  />
                </View>
                <View>
                  <ScrollView>
                    {data && data.Movies && (
                      <MovieList
                        movies={data.Movies || []}
                        onFetchMore={() => this.reDoSearch(fetchMore)}
                        onReflesh={() => {}}
                        skip={this.state.skip}
                        limit={this.limit}
                        loading={loading || false}
                        {...this.props}
                      />
                    )
                    // data.Movies.map((movie, index) => (
                    //   <View key={index}>
                    //     <Text>{movie.title}</Text>
                    //   </View>
                    // ))
                    }
                  </ScrollView>
                </View>
              </View>
            );
          }}
        </Query>
      </View>
    );
  }
}

export default SearchScreen;
