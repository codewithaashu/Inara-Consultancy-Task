import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Avatar} from 'react-native-paper';

const Home = ({route}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgMainContainer}>
        <View style={styles.imgContainer}>
          <Avatar.Image
            source={{
              uri: route.params.avatar,
            }}
            size={120}
            color="#900"
          />
        </View>
      </View>
      <Text style={styles.textStyle}>Welcome, {route.params.name}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: '#900',
    fontSize: 24,
  },
  imgMainContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});