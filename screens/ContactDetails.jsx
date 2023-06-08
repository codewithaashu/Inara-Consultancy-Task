import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ContactDetails = ({navigation, route}) => {
  const {details} = route?.params;
  const deleteHandler = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('contacts'));
    const updateContacts = data.filter(curr => {
      return curr.id !== details.id;
    });
    await AsyncStorage.setItem('contacts', JSON.stringify(updateContacts));
    navigation.navigate('home', {isUpdate: true});
  };
  const editHandler = () => {
    navigation.navigate('createContact', {isEdit: true, details});
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={28} color="black" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
          <TouchableOpacity onPress={editHandler}>
            <AntDesignIcon name="edit" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle} onPress={deleteHandler}>
            <Text style={styles.btnTextStyle}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Avatar.Image
            source={{
              uri: details.avatar
                ? details.avatar
                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            size={100}
          />
        </View>
        <View style={{marginVertical: 20, gap: 5}}>
          <Text style={styles.contactNameStyle}>
            {details?.fname + ' ' + details?.lname}
          </Text>
          <Text style={styles.contactPhoneStyle}>+91 {details?.mobile}</Text>
        </View>
      </View>
    </View>
  );
};

export default ContactDetails;

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
    backgroundColor: '#900',
    borderRadius: 20,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    marginVertical: 20,
  },
  imgContainer: {
    alignItems: 'center',
  },
  contactNameStyle: {
    textAlign: 'center',
    color: '#191970',
    fontSize: 26,
    fontWeight: 'bold',
  },
  contactPhoneStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    opacity: 0.6,
  },
});
