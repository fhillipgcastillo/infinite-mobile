import React, { Component } from "react";
import {
  View,
  Platform,
  TextInput,
  Text,
  ScrollView,
  Picker,
  TouchableHighlight
} from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MovieList from "../components/Movie/MovieList";

const SEARCH_QUERY = gql`
  query($filter: MovieFilterInput, $limit: Int, $skip: Int) {
    Genres: getAllGenres {
      name
    }
    Movies: allMovies(
      filter: $filter
      limit: $limit
      skip: $skip
      orderBy: { released: -1 }
    ) {
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
    searching: false,
    filter: {},
    selectedGenre: null
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      // headerBackground: "rgba(123, 126, 130, 0.53)",
      // headerTitle: "Discovery"
      tabBarOptions: { style: { marginTop: 24 } }
    };
  };
  handleInputChanged = text => {
    this.setState({
      filter: { ...this.state.filter, search: text },
      skip: 0,
      limit: 10
    });
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
    let self = this;

    let variables = {
      filter: { ...self.state.filter, search: this.state.search.trim() },
      limit: this.state.limit,
      skip: this.state.skip
    };
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
  getQueyVariable = ()=>{
    return {
      filter:
        Object.keys(this.state.filter).length > 0
          ? this.state.filter
          : undefined,
      limit: this.state.limit,
      skip: this.state.skip
    };
  }
  render() {
    return (
      <View>
        <Query query={SEARCH_QUERY} variables={this.getQueyVariable()}>
          {({ loading, error, data, fetchMore, variables }) => {
            return (
              <View>
                <View className="emptyUpperSpace" />
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TabBarIcon
                    name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                    style={{ padding: 10 }}
                  />

                  <TextInput
                    onChangeText={this.handleInputChanged}
                    value={this.state.search}
                    placeholder="Search for title, actors or content..."
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
                <View className="filters">
                  <View>
                    {data && data.Genres && data.Genres.length ? (
                      <Picker
                        selectedValue={this.state.selectedGenre}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({
                            selectedGenre: itemValue,
                            filter: {
                              ...this.state.filter,
                              genres: [itemValue]
                            }
                          });
                        }}
                      >
                        {data.Genres.map((g, index) => (
                          <Picker.Item
                            key={index}
                            label={g.name}
                            value={g.name}
                          />
                        ))}
                      </Picker>
                    ) : null}
                  </View>
                </View>
                <View>
                  <ScrollView>
                    {data && data.Movies && (
                      <MovieList
                        movies={data.Movies || []}
                        onFetchMore={() => this.reDoSearch(fetchMore)}
                        onReflesh={() => {}}
                        skip={this.state.skip}
                        limit={this.state.limit}
                        loading={loading || false}
                        horizontal={false}
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
