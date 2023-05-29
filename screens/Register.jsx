import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
const Register = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    dob:'',
    email: '',
    password: '',
  });
  const registerHandler = () => {
    const {name, email, password, avatar} = formData;
    if (!name || !email || !password || !avatar) {
      return alert('Please enter all fields');
    }
    setFormData({
      name: '',
      dob: '',
      email: '',
      password: '',
    });
  };


  return (
    <View
      style={styles.mainContainer}>
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
