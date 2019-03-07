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
import { Constants, WebBrowser } from "expo";

const _Button = props => {
  return (
    <TouchableOpacity
      onPress={props.handleTrailerVideo}
      style={{ ...styles.themes.default.button }}
    >
      <Text style={{ color: "white", ...styles.themes.default.textCenter }}>
        {props.title}
      </Text>
      {props.children}
    </TouchableOpacity>
  );
};
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
    // const itemId = navigation.getParam("movieId", "NO-ID");
    const movie = navigation.getParam("movie", {});
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {movie.fullImage && (
            <View style={{ display: "flex", flex: 1 }}>
              <Image
                source={{
                  uri: movie.fullImage
                }}
                style={{ height: 300, width: null, flex: 1 }}
              />
            </View>
          )}
          <View style={styles.themes.default.container}>
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
            <_Button title="Watch trailer" {...this.handleTrailerVideo} />
            <_Button title="Watch The Movie" {...this.handleOpenUpMovie} />
            
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  themes: {
    default: {
      container: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10
      },
      bigTitle: {
        fontSize: 24
      },
      title: {
        fontSize: 20,
        padding: 5,
        fontWeight: "bold"
      },
      text: {
        fontSize: 16
      },
      textCenter: {
        textAlign: "center"
      },
      padding5: {
        padding: 5
      },
      button: {
        fontSize: 16,
        padding: 5,
        backgroundColor: "#2196f3",
        color: "white",
        margin: 10,
        borderRadius: 5,
        textAlign: "center",
        flex: 1
      }
    },
    light: {},
    green: {},
    red:{}
  }
};

const defaultThemeStyle = StyleSheet.create(styles.themes.default);
// const lightThemeStyle = StyleSheet.create(styles.themes.default);