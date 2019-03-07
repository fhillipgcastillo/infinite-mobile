import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import styles from '../config/styles';

export default _Button = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.themes.default.button }}
    >
      <Text style={{ color: "white", ...styles.themes.default.textCenter }}>
        {props.title}
      </Text>
      {props.children}
    </TouchableOpacity>
  );
};
