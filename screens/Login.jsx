import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authUser = {email: 'test123@gmail.com', password: 'test123'};
const Login = ({navigation}) => {
  const [formData, setFormData] = useState({email: '', password: ''});

  const getData = async () => {
    try {
      const asyncData = await AsyncStorage.getItem('registerData');
      return asyncData;
    } catch (err) {
      console.log('error :', err);
    }
  };
  const loginHandler = async () => {
    try {
      const authUser = JSON.parse(await getData());
      if (
        formData.email === authUser.email &&
        formData.password === authUser.password
      ) {
        const jsonValue = JSON.stringify(formData);
        await AsyncStorage.setItem('loginData', jsonValue);
        navigation.navigate('home', {name: authUser.name});
      } else {
        Alert.alert('Invalid email or password');
      }
    } catch (err) {
      console.log('Error : ', err);
    }
    setFormData({email: '', password: ''});
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          outlineColor="#414A4C"
          activeOutlineColor="#1B1B1B"
          value={formData.email}
          textColor="black"
          style={styles.textInputStyle}
          onChangeText={text => setFormData({...formData, email: text})}
        />
        <TextInput
          mode="outlined"
          label="Password"
          outlineColor="#414A4C"
          activeOutlineColor="#1B1B1B"
          secureTextEntry
          style={styles.textInputStyle}
          value={formData.password}
          onChangeText={text => setFormData({...formData, password: text})}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={loginHandler}>
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationContainer}>
        <Text>Or</Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.navigationTextStyle}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  formContainer: {
    width: '80%',
    gap: 10,
  },
  textInputStyle: {
    width: '100%',
    fontSize: 18,
    color: 'red',
  },
  buttonStyle: {
    width: '100%',
    backgroundColor: 'tomato',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  navigationContainer: {
    alignItems: 'center',
    gap: 10,
  },
  navigationTextStyle: {
    fontSize: 16,
    color: '#900',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
