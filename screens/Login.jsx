import {
    Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, {useState} from 'react';

const authUser = {email:"test123@gmail.com",password:"test123"}
const Login = ({navigation}) => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const loginHandler = () => {
    console.log("form data",formData);
    if(formData.email===authUser.email && formData.password===authUser.password){
        navigation.navigate("home");
    }else{
        Alert.alert("Invalid email or password");
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
