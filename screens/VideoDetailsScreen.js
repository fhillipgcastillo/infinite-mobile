import React, { Component } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Button,
  Image,
  ScrollView
} from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export default class DetailsScreen extends Component {
  state = {
    movie: {}
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
    const itemId = navigation.getParam("movieId", "NO-ID");
    const movie = navigation.getParam("movie", {});
    this.setState({ movie: movie });
  }
  handleTrailerVideo = () => {
    Linking.canOpenURL(this.state.movie.trailer).then(supported => {
      if (supported) {
        Linking.openURL(this.state.movie.trailer);
      } else {
        console.log("Don't know how to open URI: " + this.state.movie.trailer);
      }
    });
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
    // const { navigation } = this.props;
    // const itemId = navigation.getParam("movieId", "NO-ID");
    // const movie = navigation.getParam("movie", {});
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ScrollView>
          <Image
            source={{ uri: this.state.movie.covertImage }}
            style={{height: 200, width: null, flex: 1}}
          />
          <Text>{this.state.movie.title}</Text>
          <TouchableOpacity onPress={this.handleTrailerVideo}>
            <Text>{"Watch trailer"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleOpenUpMovie}>
            <Text>{"Watch The Movie"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
