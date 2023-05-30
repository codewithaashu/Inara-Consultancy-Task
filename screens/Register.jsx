import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
  });
  const getData = async () => {
    try {
      const asyncData = await AsyncStorage.getItem('registerData');
      console.log('Async data', asyncData);
    } catch (err) {
      console.log('error :', err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const registerHandler = async () => {
    const {name, dob, email, password} = formData;
    if (!name || !dob || !email || !password) {
      return alert('Please enter all fields');
    }
    try {
      const jsonValue = JSON.stringify(formData);
      await AsyncStorage.setItem('registerData', jsonValue);
      alert('User is successfully registered');
    } catch (err) {
      console.log('Error :', err);
    }
    setFormData({
      name: '',
      dob: '',
      email: '',
      password: '',
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Name"
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Date of Birth in DD/MM/YYYY"
            value={formData.dob}
            onChangeText={text => setFormData({...formData, dob: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Email"
            value={formData.email}
            onChangeText={text => setFormData({...formData, email: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={text => setFormData({...formData, password: text})}
          />
          <TouchableOpacity style={styles.btnStyle} onPress={registerHandler}>
            <Text style={styles.buttonTextStyle}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navigationContainer}>
          <Text>Or</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.navigationTextStyle}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
  container: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
    gap: 20,
  },
  formContainer: {
    width: '80%',
    alignSelf: 'center',
    gap: 20,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#848482',
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnStyle: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'tomato',
    paddingVertical: 10,
    borderRadius: 5,
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
