import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

class MoviewPreview extends Component {
  state = {
    movie: {}
  };
  componentDidMount(){
    this.setState({movie:this.props.movie})
  }
  handleOnPress = () => {
    this.props.navigation.navigate("Details", {movieId: this.props.movie.id})
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleOnPress}>
            <View >
              <Image
                source={{ uri: this.state.movie.covertImage }}
                style={{ height: 200, width: null, flex: 1 }}
              />
              <View>
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
    margin: 10,
    padding: 5,
    backgroundColor:"white"
  }
});

export default MoviewPreview;
