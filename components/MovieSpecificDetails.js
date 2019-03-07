import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import styles from "../config/styles";

const _styles = StyleSheet.create({
  marginVertical10: {
    marginBottom: 10,
    marginTop: 10
  },
  marginHorizontal10: {
    marginLeft: 10,
    marginRight: 10
  }
});
const ComplementaryDetails = props => (
  <View
    className="complementary-details"
    style={{ display: "flex", flexDirection: "row", color: "#c7c7c7" }}
  >
    <Text
      style={{
        color: "#2196f3",
        fontWeight: "bold",
        fontSize: 16,
        ..._styles.marginHorizontal10
      }}
    >
      Views: {props.view}
    </Text>
    <Text style={{ ..._styles.marginHorizontal10 }}>{props.rating || 0}</Text>
    <Text style={{ ..._styles.marginHorizontal10 }}>{props.year}</Text>
  </View>
);

export default (MovieSpecificDetails = props => (
  <View className="movie-details" style={styles.themes.default.container}>
    <Text style={styles.themes.default.title}>{props.title}</Text>
    {props.synopsis && (
      <React.Fragment>
        <ComplementaryDetails {...props} />
        <Text
          style={{
            ...styles.themes.default.text,
            ...styles.themes.default.padding5
          }}
        >
          {props.synopsis}
        </Text>
        <Text>
          Actors:
          {props.actors &&
            props.actors.length > 0 &&
            props.actors.map((actor, index) => (
              <Text key={index}>{actor}</Text>
            ))}
        </Text>
      </React.Fragment>
    )}
  </View>
));
