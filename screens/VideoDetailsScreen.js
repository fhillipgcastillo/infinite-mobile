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
  static navigationOptions = ({ movie, navigation }) => {
    let video = navigation.getParam("movie", {});
    return {
      title: (movie && movie.title) || video.title || ""
      // headerTransparent: true,
      // headerTintColor: "rgba(255,255,255,.8)"
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
    // console.log("data", this.props.data);
    if(this.props.data) this.setState({ movie: this.props.data.movie });
  }
  handleTrailerVideo = () => {
    WebBrowser.openBrowserAsync(this.props.data.movie.trailer);
    // Linking.canOpenURL(this.state.movie.trailer).then(supported => {
    //   if (supported) {
    //     Linking.openURL(this.state.movie.trailer);
    //   } else {
    //     console.log("Don't know how to open URI: " + this.state.movie.trailer);
    //   }
    // });
  };
  handleOpenUpMovie = () => {
    WebBrowser.openBrowserAsync(this.state.movie.mediaContent);
    // this still commented because Maybe in IOS it would not work
    // Linking.canOpenURL(this.state.movie.mediaContent).then(supported => {
    //   if (supported) {
    //     Linking.openURL(this.state.movie.mediaContent);
    //   } else {
    //     console.log(
    //       "Don't know how to open URI: " + this.state.movie.mediaContent
    //     );
    //   }
    // });
  };
  render() {
    const { navigation } = this.props;
    const movie = navigation.getParam("movie", {});
    return (
      <Query query={this._getQuery() || "{}"} variables={{ movieId: movie.id }}>
        {({ loading, error, data, fetchMore, variables }) => {
          // if(data && this.state.movie) console.log('have data', this.state.movie);
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

                {movie && (
                  <React.Fragment>
                    {data && data.movie && <MovieThumbnailContainer
                      thumbnailSrc={data.movie.fullImage || movie.covertImage}
                    />}

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
                        onPress={this.handleTrailerVideo}
                      />
                      <_Button
                        title="Watch The Movie"
                        onPress={this.handleOpenUpMovie}
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
