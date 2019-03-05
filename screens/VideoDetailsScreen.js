import React, { Component } from 'react';
import {View, Text} from 'react-native';

export default class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('movieId', 'NO-ID');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen {itemId}</Text>
      </View>
    );
  }
}