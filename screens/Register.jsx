import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Dialog, Button} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Register = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
  });
  const [visible, setVisible] = React.useState(false);
  const [avatar, setAvatar] = React.useState(
    'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = date => {
    setFormData({...formData, dob: date.toString().substring(4, 16)});
    hideDatePicker();
  };

  const registerHandler = async () => {
    try {
      const {name, dob, email, password} = formData;
      if (!name || !dob || !email || !password) {
        return alert('Please enter all fields');
      }
      const jsonValue = JSON.stringify({
        ...formData,
        avatar: avatar,
      });
      await AsyncStorage.setItem('registerData', jsonValue);
      alert('User is successfully registered');
      setFormData({
        name: '',
        dob: '',
        email: '',
        password: '',
      });
      navigation.navigate('login');
    } catch (err) {
      console.log('Error :', err);
    }
  };

  const pickPictureCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      setAvatar(image.path);
    });
    hideDialog();
  };
  const pickPictureGallery = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      setAvatar(image.path);
    });
    hideDialog();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imgMainContainer}>
          <View style={styles.imgContainer}>
            <Avatar.Image
              source={{
                uri: avatar,
              }}
              size={120}
              color="red"
            />
            <TouchableOpacity style={styles.iconBtnStyle} onPress={showDialog}>
              <AntDesignIcon name="edit" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Name"
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Date of Birth"
            value={formData.dob}
            onPressIn={showDatePicker}
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
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{
          backgroundColor: '#343434',
          opacity: 0.8,
          paddingVertical: 25,
        }}>
        <Dialog.Content style={{gap: 25}}>
          <TouchableOpacity
            style={[styles.btnStyle, {backgroundColor: 'black'}]}
            onPress={pickPictureCamera}>
            <Text style={[styles.buttonTextStyle, {fontWeight: 'bold'}]}>
              Take from Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnStyle, {backgroundColor: 'black'}]}
            onPress={pickPictureGallery}>
            <Text style={[styles.buttonTextStyle, {fontWeight: 'bold'}]}>
              Choose from Gallery
            </Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
    gap: 20,
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
  iconBtnStyle: {
    backgroundColor: 'tomato',
    padding: 5,
    borderRadius: 50,
    position: 'absolute',
    left: 80,
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
