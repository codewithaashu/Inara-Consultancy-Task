import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Searchbar} from 'react-native-paper';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation, route}) => {
  const imageURI = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState([]);
  // console.log('user', user);
  const [searchQuery, setSearchQuery] = useState('');
  // console.log('contacts', contacts);
  useEffect(() => {
    getAllContacts();
  }, [route]);
  const getAllContacts = async () => {
    try {
      const contacts = JSON.parse(await AsyncStorage.getItem('contacts'));
      const user = JSON.parse(await AsyncStorage.getItem('registerData'));
      setContacts(contacts);
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };
  const searchHandler = searchVal => {
    if (searchVal.length == 0) {
      setContacts(contacts);
      return;
    }
    const searchResult = contacts.filter(curr => {
      console.log('curr1', curr.fname);
      const name = curr?.fname + ' ' + curr?.lname;
      if (name.toLowerCase().includes(searchVal.toLowerCase())) {
        return curr;
      }
    });
    // console.log('searchResult', searchResult);
    setContacts(searchResult);
  };
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <View>
          <Avatar.Image
            source={{
              uri: user?.avatar ? user.avatar : imageURI,
            }}
            size={50}
          />
        </View>
        <View>
          <Text style={styles.textStyle}>Hi, {user?.name}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <Searchbar
          placeholder="Search contacts"
          onChangeText={text => {
            setSearchQuery(text);
            searchHandler(text);
          }}
          value={searchQuery}
          onFocus={searchHandler}
        />
      </View>
      <View>
        <ScrollView style={styles.mainContactContainer}>
          {contacts?.map((curr, index) => {
            return (
              <TouchableOpacity
                style={styles.contactContainer}
                onPress={() =>
                  navigation.navigate('contactDetails', {details: curr})
                }
                key={index}>
                {curr?.avatar === imageURI ? (
                  <Avatar.Text
                    label={curr.fname.charAt(0)}
                    style={{backgroundColor: getRandomColor()}}
                    color="white"
                    size={38}
                  />
                ) : (
                  <Avatar.Image source={{uri: curr?.avatar}} size={38} />
                )}
                <Text style={styles.contactTextStyle}>
                  {curr?.fname + ' ' + curr?.lname}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('createContact', {isEdit: false})}>
          <IoniIcons name="add-circle" size={60} color="tomato" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  mainContactContainer: {
    marginVertical: 20,
    paddingHorizontal: 25,
  },
  contactContainer: {
    flexDirection: 'row',
    gap: 10,
    textAlign: 'center',
    marginVertical: 12,
    alignItems: 'center',
  },
  contactTextStyle: {
    fontSize: 18,
    color: 'black',
  },
});
