import React, { Component } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet
} from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Constants, WebBrowser } from "expo";
import _Button from "../components/Button";
import MovieThumbnailContainer from "../components/MovieThumbnailContainer";
import styles from "../config/styles";

export default class DetailsScreen extends Component {
  state = {
    movie: {}
  };
  static navigationOptions = ({ navigation }) => {
    let video = navigation.getParam("movie", {});
    return {
      // title: video.title || "",
      headerTransparent: true,
      headerTintColor: "rgba(255,255,255,.8)"
    };
  };
  getMovieId = () => {
    const { navigation } = this.props;
    return navigation.getParam("movieId", "");
  };
  _getQuery = () => {
    let QUERY_DETAILS = gql`
      getMovie(_id: ${this.getMovieId()}){
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
      }
    `;
    return QUERY_DETAILS;
  };
  componentDidMount() {
    const { navigation } = this.props;
    const movie = navigation.getParam("movie", {});
    this.setState({ movie: movie });
  }
  handleTrailerVideo = () => {
    WebBrowser.openBrowserAsync(this.state.movie.trailer);
    // Linking.canOpenURL(this.state.movie.trailer).then(supported => {
    //   if (supported) {
    //     Linking.openURL(this.state.movie.trailer);
    //   } else {
    //     console.log("Don't know how to open URI: " + this.state.movie.trailer);
    //   }
    // });
  };
  handleOpenUpMovie = () => {
    Linking.canOpenURL(this.state.movie.mediaContent).then(supported => {
      if (supported) {
        Linking.openURL(this.state.movie.mediaContent);
      } else {
        console.log(
          "Don't know how to open URI: " + this.state.movie.mediaContent
        );
      }
    });
  };
  render() {
    const { navigation } = this.props;
    const movie = navigation.getParam("movie", {});

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {/* movie-thumbnail-container */}
          {movie.fullImage && <MovieThumbnailContainer thumbnailSrc={movie.fullImage} />}
          {/* movie details */}

          <View
            className="movie-details"
            style={styles.themes.default.container}
          >
            <Text style={styles.themes.default.title}>
              {this.state.movie.title}
            </Text>
            <Text
              style={{
                ...styles.themes.default.text,
                ...styles.themes.default.padding5
              }}
            >
              {this.state.movie.synopsis}
            </Text>
          </View>
          {/* movie action */}
          <View
            className="movie-actions"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <_Button title="Watch trailer" {...this.handleTrailerVideo} />
            <_Button title="Watch The Movie" {...this.handleOpenUpMovie} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const defaultThemeStyle = StyleSheet.create(styles.themes.default);
// const lightThemeStyle = StyleSheet.create(styles.themes.default);
