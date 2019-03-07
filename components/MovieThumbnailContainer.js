import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';
import styles from '../config/styles';

export default MovieThumbnailContainer = props => {
  return (
    <View
      className="movie-thumbnail-container"
      style={{ display: "flex", flex: 1 }}
    >
      <Image
        source={{
          uri: props.thumbnailSrc
        }}
        style={{ height: 300, width: null, flex: 1 }}
      />
    </View>
  );
};