import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
  Button,
  FlatList
} from "react-native";
import MoviewPreview from "./MoviePreview";

export default class MovieList extends Component {
  state = { movies: [], currentPage: 1, pageSize: 10, isLoading: false, lastOfset:{x:0, y:0} };
  componentDidMount() {
    if (this.props.loading) this.setState({ isLoading: this.props.loading });
  };
  onFetchMore = this.props.onFetchMore;
  onRefresh = this.props.onReflesh;
  handleScroll = ({ nativeEvent }) => {
    if (
      nativeEvent.contentOffset.y >=
        nativeEvent.contentSize.height -
          nativeEvent.layoutMeasurement.height * 2 &&
      nativeEvent.contentOffset.y <= nativeEvent.contentSize.height &&
      !this.state.isLoading
    ) {
      this.setState({isLoading:true, lastOfset: nativeEvent.contentOffse});
      this.onFetchMore();
      // this.setState({lastOfset: nativeEvent.contentOffse});
      nativeEvent.contentOffset = this.state.lastOfset
      console.log("do reload");
    }
    // console.log("loading", this.props.loading);
  };
  handleScrollEnd = SyntheticEvent => {};
  render() {
    let props = this.props;
    return (
      <React.Fragment>
        <Text style={{fontWeight:"bold", fontSize:16, marginLeft:5, ...styles.listContainer.padding}}>{props.title}</Text>
        <FlatList
          style={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.onRefresh}
            />
          }
          horizontal={true}
          // onScroll={this.handleScroll}
          // onScrollEndDrag={this.handleScrollEnd}
          // scrollEventThrottle={16}
          pagingEnabled={true}
          overScrollMode="always"
          data={this.props.movies}
          keyExtractor={(item, index) => item.id}
          renderItem={({ index, item, separators }) => (
            <MoviewPreview
              key={index}
              movie={item}
              onDetailPress={() => props.navigation.navigate("Details")}
              navigation={props.navigation}
            />
          )}
        />
        </React.Fragment>
    );
  };
  componentDidUpdate(){
    if(this.state.isLoading) {
      this.setState({isLoading: false});
      // this.setState({isLoading:false, lastOfset: nativeEvent.contentOffse});
    }
  };
}

let styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    display: "flex"
  },
  pagination: {
    display: "flex",
    width: 50
  }
});
