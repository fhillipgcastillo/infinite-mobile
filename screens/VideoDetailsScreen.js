import React, { Component } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Constants, WebBrowser } from "expo";
import _Button from "../components/Button";
import MovieThumbnailContainer from "../components/MovieThumbnailContainer";
import MovieSpecificDetails from "../components/MovieSpecificDetails";
import styles from "../config/styles";

export default class DetailsScreen extends Component {
  state = {
    movie: {}
  };
  Data = null;
  static navigationOptions = ({ movie, navigation }) => {
    let video = navigation.getParam("movie", {});
    return {
      title: (movie && movie.title) || video.title || "",
      // headerTransparent: true,
      // headerTintColor: "rgba(255,255,255,.8)"
      headerStyle: {
        backgroundColor: "#2196f3a6",
        color: "white"
      }
    };
  };
  getMovieId = () => {
    const { navigation } = this.props;
    return navigation.getParam("movie", {}).id;
  };
  _getQuery = () => {
    let QUERY_DETAILS = gql`
      query($movieId: String) {
        movie: getMovie(_id: $movieId) {
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
          trailer
          synopsis
          view
          rating
          actors
        }
      }
    `;
    return QUERY_DETAILS;
  };
  componentDidMount() {
    const { navigation } = this.props;
    const movie = navigation.getParam("movie", {});
    this.setState({ movie: movie });
    if (this.props.data) this.setState({ movie: this.props.data.movie });
  }
  handleTrailerVideo = src => {
    try {
      WebBrowser.openBrowserAsync(src);
    } catch {
      Linking.canOpenURL(src).then(supported => {
        if (supported) {
          Linking.openURL(src);
        } else {
          console.log(
            "Don't know how to open URI: " + src
          );
        }
      });
    }
  };
  handleOpenUpMovie = src => {
    try {
      WebBrowser.openBrowserAsync(src);
    } catch {
      Linking.canOpenURL(src).then(supported => {
        if (supported) {
          Linking.openURL(src);
        } else {
          console.log(
            "Don't know how to open URI: " + src
          );
        }
      });
    }
  };
  render() {
    const { navigation } = this.props;
    const movie = navigation.getParam("movie", {});
    return (
      <Query query={this._getQuery() || "{}"} variables={{ movieId: movie.id }}>
        {({ loading, error, data, fetchMore, variables }) => {
          if (data) this.Data = data;
          return (
            <View style={{ flex: 1 }}>
              <ScrollView>
                {loading ? (
                  <ActivityIndicator
                    animating={loading}
                    style={[styles.centering, { height: 80 }]}
                    size="large"
                  />
                ) : null}

                {data && data.movie && (
                  <React.Fragment>
                    <MovieThumbnailContainer
                      thumbnailSrc={data.movie.fullImage || movie.covertImage}
                    />
                    {/* <Text style={styles.themes.default.title}>
                      {movie.title}
                    </Text> */}
                    <MovieSpecificDetails {...data.movie} />
                    <View
                      className="movie-actions"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                      }}
                    >
                      <_Button
                        title="Watch trailer"
                        onPress={() => this.handleTrailerVideo(data.movie.trailer)}
                      />
                      <_Button
                        title="Watch The Movie"
                        onPress={() => this.handleOpenUpMovie(data.movie.mediaContent)}
                      />
                    </View>
                    <View className="MoreLikeThis" />
                  </React.Fragment>
                )}
              </ScrollView>
            </View>
          );
        }}
      </Query>
    );
  }
}

const defaultThemeStyle = StyleSheet.create(styles.themes.default);
// const lightThemeStyle = StyleSheet.create(styles.themes.default);
