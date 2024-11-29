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
import React, {useState, useMemo, useEffect} from 'react';
import Header from '../components/header';
import {useSelector, useDispatch} from 'react-redux';
import {setCred, updateCred} from '../store/slices/homeSlice';
import DrawerNavigation from './drawernavigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) return 'Email is mandatory field';
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email);
      setLoading(false);
      return 'Password reset email sent!';
    } catch (error) {
      setLoading(false);
      return `Error sending password reset email:, ${error} `;
      // Show error message to the user
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <View style={styles.container}>
        <DrawerNavigation navigation={navigation} />

        <View style={{marginTop: 10, padding: 24}}>
          <View style={styles.second}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Enter Your Email"
              placeholderTextColor={'#000'}
            />
            <TouchableOpacity
              style={loading ? styles.disableButton : styles.button}
              disabled={loading}
              onPress={async () => {
                const res = await handleForgotPassword();
                Alert.alert(res);
              }}>
              <Text style={styles.buttonText}>Send Link</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: 26,
  },
  disableButton: {
    backgroundColor: '#003B70',
    paddingVertical: 12,
    width: '94%',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 26,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Nunito-Regular',
    color: '#fff',
    lineHeight: 30,
    textAlign: 'center',
  },
});

export default ForgotPassword;
