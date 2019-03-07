import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet,View } from "react-native";
import styles from "../config/styles";

export default (MovieSpecificDetails = props => (
  <View className="movie-details" style={styles.themes.default.container}>
    <Text style={styles.themes.default.title}>{props.title}</Text>
    <Text
      style={{
        ...styles.themes.default.text,
        ...styles.themes.default.padding5
      }}
    >
      {props.synopsis}
    </Text>
  </View>
));
