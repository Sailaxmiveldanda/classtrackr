import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  TextInput,
  Alert,
  disabledButton,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserData} from '../api/auth';

import {setCred} from '../store/slices/homeSlice';

export default function Login({navigation}) {
  const homeData = useSelector(state => state.home);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const HandleLogin = async () => {
    if (!email && !password) {
      dispatch(setCred({email: '', password: ''}));
      Alert.alert('email and password is required');
    } else {
      if (email && password) {
        try {
          setLoading(true);
          console.log(email);

          const isUserCreated = await auth().signInWithEmailAndPassword(
            email.trim(),
            password,
          );

          const additionalDetails = await fetchUserData(isUserCreated.user.uid);
          // console.log('credssdddgfhg', isUserCreated, additionalDetails);
          dispatch(
            setCred({
              email: email,
              password: password,
              class: additionalDetails.class,
              firstName: additionalDetails.firstName,
              lastName: additionalDetails.lastName,
              middleName: additionalDetails.middleName,
              phone: additionalDetails.phone,
              roleNumber: additionalDetails.roleNumber,
              userRole: additionalDetails.userRole,
              role: additionalDetails.role,
              department: additionalDetails.department,
            }),
          );
          // console.log('creds', isUserCreated);
          navigation.navigate('DashBoard');
          setLoading(false);
        } catch (err) {
          console.log(err.message);
          setMessage(err.message);
          setLoading(false);
          Alert.alert('email and password is incorrect');
        }
      } else {
        dispatch(setCred({email: '', password: ''}));
        Alert.alert('email or password is incorrect');
      }
    }
  };

  return (
    <View>
      <SafeAreaView>
        <View>
          <View style={{marginHorizontal: 20, marginVertical: 60}}>
            <Image
              source={require('../assets/images/LogoText1.png')}
              style={styles.img}
            />
          </View>

          <View
            style={{
              padding: 14,
            }}>
            <Text style={{color: '#000', fontSize: 18, marginBottom: 20}}>
              Sign in with your Organizational Account
            </Text>
            <Text style={styles.label}>User Name: </Text>
            <TextInput
              style={styles.input}
              onChangeText={value => setEmail(value)}
              value={email}
              placeholder="Email"
              placeholderTextColor={'#000'}
            />
            <Text style={styles.label}>Password : </Text>
            <TextInput
              style={styles.input}
              onChangeText={value => setPassword(value)}
              value={password}
              placeholder="Password"
              placeholderTextColor={'#000'}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={loading ? styles.disabledButton : styles.button}
              onPress={() => HandleLogin()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('forgotPassword')}>
              <Text style={styles.pass}>Forgot Password</Text>
            </TouchableOpacity>
            {loading && <Text style={styles.loading}>Loading...</Text>}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B3B3B3',
    padding: 10,
    color: '#000',
  },
  label: {
    color: '#000',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Nunito-Regular',
    color: '#fff',
    lineHeight: 30,
    textAlign: 'center',
  },
  img: {
    width: 300,
    height: 90,
  },
  loading: {
    color: '#003B70',
    textAlign: 'center',
    fontSize: 30,
  },
  pass: {
    color: '#003B70',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#003B70',
    paddingVertical: 12,
    marginTop: 20,
    width: '94%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#003B70',
    paddingVertical: 12,
    opacity: 0.4,
    marginTop: 20,
    width: '94%',
    alignSelf: 'center',
    borderRadius: 8,
  },
});
