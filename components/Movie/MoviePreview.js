import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

class MoviewPreview extends PureComponent {
  state = {
    movie: {}
  };
  componentDidMount(){
    this.setState({movie:this.props.movie})
  }
  handleOnPress = () => {
    this.props.navigation.navigate("Details", {movieId: this.props.movie.id, movie: this.props.movie})
    // this.props.navigation.navigate("Details", {movieId: this.props.movie.id, movie: this.props.movie})
    // this.props.fetchMore && this.props.fetchMore({variables:{}},{})

  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleOnPress}>
            <View>
              <Image
                source={{ uri: this.state.movie.covertImage }}
                style={{ height: 200, width: 150}}
              />
              
              <View style={{display: "none" }} >
                <View>
                  <Text>{this.state.movie.title}</Text>
                </View>
                <View>
                  <Text>{this.state.movie.year}</Text>
                </View>
              </View>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor:"white",
    flex: 1,
    width: 150
  },
  padding_5: {
    padding: 5
  }
});

export default MoviewPreview;
