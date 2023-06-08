import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Avatar, Dialog} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateContact = ({navigation, route}) => {
  const imageURI = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  const {isEdit} = route.params;
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    mobile: '',
    avatar: imageURI,
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (route?.params?.isEdit) {
      setFormData(route?.params?.details);
    }
  }, [route]);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const pickPictureCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      setFormData({...formData, avatar: image.path});
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
      setFormData({...formData, avatar: image.path});
    });
    hideDialog();
  };

  const submitHandler = async () => {
    //if it is edit command
    if (route?.params?.isEdit) {
      //get all contacts
      const data = JSON.parse(await AsyncStorage.getItem('contacts'));
      //update the particular contact
      const updateContacts = data.map(curr => {
        if (curr.id === route.params.details.id) {
          curr = {...formData, id: curr.id};
        }
        return curr;
      });
      await AsyncStorage.setItem('contacts', JSON.stringify(updateContacts));
    }
    //if it is add command
    else {
      //if we didn't enter mandatory fields
      if (!formData.fname || !formData.mobile) {
        return Alert.alert('Please enter all mandatory fields');
      }
      // await AsyncStorage.removeItem('contacts');
      //add unique id
      const id = Date.now();
      setFormData({...formData, id});

      //check the async storage data
      const asyncData = await AsyncStorage.getItem('contacts');
      //if async storage data is null
      if (asyncData === null) {
        await AsyncStorage.setItem(
          'contacts',
          JSON.stringify([{...formData, id}]),
        );
      }
      //if async storage data is not null
      else {
        //push formdata in old async storage data
        const asyncUpdateData = [...JSON.parse(asyncData), {...formData, id}];
        //update the async storage
        await AsyncStorage.setItem('contacts', JSON.stringify(asyncUpdateData));
      }
    }
    navigation.navigate('home', {isUpdate: true});
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EntypoIcon name="cross" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.textStyle}>
          {isEdit ? 'Edit Contact' : 'Create Contact'}
        </Text>
        <TouchableOpacity style={styles.btnStyle} onPress={submitHandler}>
          <Text style={styles.btnTextStyle}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.imgMainContainer}>
          <View style={styles.imgContainer}>
            <Avatar.Image
              source={{
                uri: formData.avatar === imageURI ? imageURI : formData.avatar,
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
            placeholder="First Name"
            value={formData.fname}
            onChangeText={text => setFormData({...formData, fname: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Last Name"
            value={formData.lname}
            onChangeText={text => setFormData({...formData, lname: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Phone Number"
            keyboardType={'phone-pad'}
            value={formData.phone}
            onChangeText={text => setFormData({...formData, phone: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Mobile Number"
            keyboardType={'phone-pad'}
            value={formData.mobile}
            onChangeText={text => setFormData({...formData, mobile: text})}
          />
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
    </View>
  );
};

export default CreateContact;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
  },
  btnStyle: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#008B8B',
    borderRadius: 20,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: 16,
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
  buttonTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
