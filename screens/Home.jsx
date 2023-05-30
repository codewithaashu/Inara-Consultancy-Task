import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = ({route}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textStyle}>Welcome, {route.params.name}</Text>
    </View>
  );
};

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: '#900',
    fontSize: 24
  },
});