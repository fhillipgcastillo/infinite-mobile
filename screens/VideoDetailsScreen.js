import React, { Component } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  StyleSheet
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
    // const itemId = navigation.getParam("movieId", "NO-ID");
    const movie = navigation.getParam("movie", {});
    this.setState({ movie: movie });
    console.log("fullImg", movie.fullImage);
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
    const { navigation } = this.props;
    // const itemId = navigation.getParam("movieId", "NO-ID");
    const movie = navigation.getParam("movie", {});
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {movie.fullImage && (
            <View style={{ padding: 2.5, display: "flex", flex: 1 }}>
              <Image
                source={{
                  uri:
                    movie.fullImage ||
                    "https://www.skylightcinemas.com/template_1/img/default-movie-landscape.jpg"
                }}
                style={{ height: 300, width: null, flex: 1 }}
              />
            </View>
          )}
          <Text style={styles.themes.default.title}>
            {this.state.movie.title}
          </Text>
          <Text style={{...styles.themes.default.text,...styles.themes.default.padding5}}>
            {this.state.movie.synopsis}
          </Text>
          <View style={{ display:"flex", flexDirection: "row", justifyContente:"space-between"}}>
            <TouchableOpacity
              onPress={this.handleTrailerVideo}
              style={{...styles.themes.default.button}}
            >
              <Text style={{...styles.themes.default.textCenter}}>{"Watch trailer"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleOpenUpMovie}
              style={styles.themes.default.button}
            >
              <Text style={{...styles.themes.default.textCenter}}>{"Watch The Movie"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  themes: {
    default: {
      bigTitle: {
        fontSize: 22
      },
      title: {
        fontSize: 18,
        padding: 5
      },
      text: {
        fontSize: 12
      },
      textCenter: {
        textAlign: "center"
      },
      padding5: {
        padding: 5
      },
      button: {
        fontSize: 12,
        padding: 5,
        backgroundColor: "#2196f3",
        color: "white",
        marginTop: 5,
        marginButton: 5,
        borderRadius: 5,
        textAlign: "center"
      }
    }
  }
};
