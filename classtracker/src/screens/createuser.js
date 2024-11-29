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
import DropDownPicker from 'react-native-dropdown-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import firestore from '@react-native-firebase/firestore';

async function fetchDepartments() {
  try {
    const departmentsSnapshot = await firestore()
      .collection('Departments')
      .get();

    const departments = departmentsSnapshot.docs.map(doc => ({
      label: doc.data().name,
      value: doc.data().name,
      id: doc.data().id,
    }));

    return {departments};
  } catch (error) {
    console.error('Error fetching departments and classes:', error);
    // Handle errors appropriately
  }
}

const CreateUser = ({navigation}) => {
  const [firstName, setFirstName] = React.useState();
  const [email, setEmail] = React.useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [courseOpen, setCourseOpen] = useState(false);
  const [courseValue, setCourseValue] = useState(null);
  const [courseItems, setCourseItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Coordinator',
        value: 'Coordinator',
      },
      {
        id: '2',
        label: 'Instructor',
        value: 'Instructor',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState('1');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDepartments();
      setItems(data.departments);
    };
    fetchData();
  }, []);

  const fetchClassesByDepartment = async departmentId => {
    if (!departmentId) return; // Handle no department selected
    setCourseItems([]);
    const classesSnapshot = await firestore()
      .collection('courses')
      .where('dept_id', '==', departmentId)
      .get();
    const fetchedClasses = classesSnapshot.docs.map(doc => ({
      label: doc.data().course_name,
      value: doc.data().course_name,
    }));
    setCourseItems(fetchedClasses);
  };

  async function createNewUser(name, emailId, role, department, course) {
    if (!name || !emailId || !role || !department || !course)
      return 'All fields are required';
    try {
      setLoading(true);
      const defaultPassword = `${name}_${role}@123`;
      const createUserResult = await auth().createUserWithEmailAndPassword(
        emailId,
        defaultPassword,
      );
      const uid = createUserResult.user.uid;

      // Create user document in Firestore
      const userRef = firestore().collection('users').doc(uid);
      await userRef.set({
        firstName: name,
        role: role,
        department: department,
        class: course,
      });
      setLoading(false);
      return 'User created successfully!';
    } catch (error) {
      console.error('Error creating user:', error);
      setLoading(false);
      return `Error creating user:, ${error}`;
    }
  }

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
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFirstName}
              value={firstName}
              placeholder="Enter user name"
              placeholderTextColor={'#000'}
            />
            <Text style={styles.label}>Email*</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Enter user email"
              placeholderTextColor={'#000'}
            />

            <Text style={styles.label}>Role:</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              layout="row"
              labelStyle={{color: '#000'}}
            />
            <View style={{marginBottom: 26}}></View>
            <Text style={styles.label}>Department:</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder={'Select Department'}
              zIndex={10000}
              onSelectItem={item => {
                console.log('item', item);
                fetchClassesByDepartment(item.id);
              }}
            />
            <View style={{marginBottom: 26}}></View>
            <Text style={styles.label}>Course:</Text>
            <DropDownPicker
              open={courseOpen}
              value={courseValue}
              items={courseItems}
              setOpen={setCourseOpen}
              setValue={setCourseValue}
              setItems={setCourseItems}
              placeholder={'Select Course'}
            />
            <TouchableOpacity
              style={loading ? styles.disableButton : styles.button}
              disabled={loading}
              onPress={async () => {
                const res = await createNewUser(
                  firstName,
                  email,
                  selectedId === '1' ? 'Coordinator' : 'Instructor',
                  value,
                  courseValue,
                );
                Alert.alert(res);
              }}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setFirstName('');
            setEmail('');
            setValue('');
            setCourseValue('');
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Nunito-Regular',
              color: '#000',
              lineHeight: 30,
              textAlign: 'center',
            }}>
            Reset
          </Text>
        </TouchableOpacity>
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

export default CreateUser;
