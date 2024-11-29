import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import Header from '../components/header';
import {useSelector, useDispatch} from 'react-redux';
import {setCred, updateCred} from '../store/slices/homeSlice';
import {useFocusEffect} from '@react-navigation/native';
import DrawerNavigation from './drawernavigation';
import auth from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
  const homeData = useSelector(state => state.home);
  const [firstName, setFirstName] = React.useState(homeData?.firstName);
  // const [middleName, setMiddleName] = React.useState(homeData?.middleName);
  // const [lastName, setLastName] = React.useState(homeData?.lastName);
  // const [email, setEmail] = React.useState(homeData?.email);
  // const [phone, setPhone] = React.useState(homeData?.phone);
  const [nameOfClass, setNameOfClass] = React.useState(homeData?.class);
  // const [roleNumber, setRoleNumber] = React.useState(homeData?.roleNumber);
  const [role, setRole] = React.useState(homeData?.role);
  const [department, setDepartment] = React.useState(homeData?.department);

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      setFirstName(homeData?.firstName);
      // setMiddleName(homeData?.middleName);
      // setLastName(homeData?.lastName);
      // setEmail(homeData?.email);
      // setPhone(homeData?.phone);
      setNameOfClass(homeData?.class);
      // setRoleNumber(homeData?.roleNumber);
      setRole(homeData?.role);
      setRole(homeData?.department);
    }, [
      homeData?.firstName,
      // homeData?.middleName,
      // homeData?.lastName,
      // homeData?.email,
      // homeData?.phone,
      homeData?.class,
      // homeData?.roleNumber,
      homeData?.role,
      homeData?.department,
    ]),
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <View style={styles.container}>
        <DrawerNavigation navigation={navigation} />
        {/* <Header
          // name="Profile"
          // login={() => {
          //   auth()
          //     .signOut()
          //     .then(() => {
          //       console.log('User signed out!');
          //       dispatch(setCred({email: '', password: '', loggedIn: false}));
          //       navigation.popToTop();
          //     });
          // }}
        /> */}
        <ScrollView style={{marginTop: 10, padding: 24}}>
          <View style={styles.second}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFirstName}
              editable = {false}
              value={firstName}
              placeholder="Name"
              placeholderTextColor={'#000'}
            />
            {/* <Text style={styles.label}>Middle Name*</Text>
            <TextInput
              style={styles.input}
              onChangeText={setMiddleName}
              value={middleName}
              placeholder="Username"
              placeholderTextColor={'#000'}
            />
            <Text style={styles.label}>Last Name*</Text>
            <TextInput
              style={styles.input}
              onChangeText={setLastName}
              value={lastName}
              placeholder="Username"
              placeholderTextColor={'#000'}
            />
            <Text style={styles.label}>Email*</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Username"
              placeholderTextColor={'#000'}
            />
            <Text style={styles.label}>Phone Number*</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPhone}
              value={phone}
              placeholder="Username"
              placeholderTextColor={'#000'}
            /> */}
            <Text style={styles.label}>Course:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNameOfClass}
              editable = {false}
              value={nameOfClass}
              placeholder="Class"
              placeholderTextColor={'#000'}
            />
            {/* <Text style={styles.label}>Role number*</Text>
            <TextInput
              style={styles.input}
              onChangeText={setRoleNumber}
              value={roleNumber}
              placeholder="Username"
              placeholderTextColor={'#000'}
            /> */}
            <Text style={styles.label}>Role:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setRole}
              editable = {false}
              value={role}
              placeholder="Admin"
              placeholderTextColor={'#000'}
            />
            <Text style={styles.label}>Department</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDepartment}
              editable = {false}
              value={department}
              placeholder="Department"
              placeholderTextColor={'#000'}
            />
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => {
                dispatch(
                  updateCred({
                    firstName,
                    // middleName,
                    // lastName,
                    // email,
                    // phone,
                    class: nameOfClass,
                    // roleNumber,
                    role,
                    department,
                  }),
                  Alert.alert('updated successfully'),
                );
              }}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  first: {
    alignItems: 'center',
  },
  second: {
    marginTop: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#00420C',
    lineHeight: 20,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#B3B3B3',
    color: '#000',
    padding: 0,
    fontSize: 18,
    height: 30,
    marginBottom: 26,
  },
  button: {
    backgroundColor: '#003B70',
    paddingVertical: 12,
    width: '94%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Nunito-Regular',
    color: '#fff',
    lineHeight: 30,
    textAlign: 'center',
  },
});

export default Profile;
