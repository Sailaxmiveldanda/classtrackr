// configuring authentication from firebase
import firestore from '@react-native-firebase/firestore';

// Async action to fetch data from backend
export const fetchUserData = async id => {
  try {
    const data = await firestore().collection('users').doc(id).get();
    console.log("userdata", data);
    const userData = data._data;
    // console.log("userdata", userData);
    return userData;
  } catch (err) {
    console.log(err);
  }
};
