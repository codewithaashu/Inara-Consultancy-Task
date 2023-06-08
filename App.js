import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './screens/Register';
import Home from './screens/Home';
import Login from './screens/Login';
import CreateContact from './screens/CreateContact';
import ContactDetails from './screens/ContactDetails';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'login'}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="createContact"
          component={CreateContact}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="contactDetails"
          component={ContactDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App

const styles = StyleSheet.create({})