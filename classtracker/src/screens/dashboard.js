import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import DrawerNavigation from './drawernavigation';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
// const Departments = [
//   {
//     name: 'Agricultural Sciences',
//     courses: [
//       {
//         name: 'Course 1',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       {
//         name: 'Course 2',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       {
//         name: 'Course 3',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Business',
//     courses: [
//       {
//         name: 'Course 1',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       {
//         name: 'Course 2',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       {
//         name: 'Course 3',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Communication & MassMedia',
//     courses: [
//       {
//         name: 'Course 1',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       {
//         name: 'Course 2',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       {
//         name: 'Course 3',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Computer Science & Information Systems',
//     courses: [
//       {
//         name: 'SOFTWARE ENGINEERING PRACTICE 01SP23',
//         assignments: [
//           {
//             name: 'Client Meeting 2: 02/02/2023',
//             outcome: {
//               name: 'Learning Outcome for Client Meeting 2',
//               outcomes: [
//                 {
//                   name: '1-CS-02-A Communicate effectively as a aliason between professionals and end users about software usage',
//                   value: '25% for Learning Outcome 1',
//                 },
//                 {
//                   name: '2-CS-03-J Crtical Thinking',
//                   value: '50% for Learning Outcome 2',
//                 },
//                 {
//                   name: '3-cs-03-L  Managing Information',
//                   value: '25% for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'MileStone #1 - UseCase Diagrams Scrum Presentation',
//             outcome: {
//               name: 'Outcome for MileStone #1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       {
//         name: 'BIG DATA 0 1 SP23',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       {
//         name: 'WEB MINING 01 SP23',
//         assignments: [
//           {
//             name: 'Assignment 1',
//             outcome: {
//               name: 'Outcome for Assignment 1',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//           {
//             name: 'Assignment 2',
//             outcome: {
//               name: 'Outcome for Assignment 2',
//               outcomes: [
//                 {
//                   name: 'Learning Outcome 1',
//                   value: 'Value for Learning Outcome 1',
//                 },
//                 {
//                   name: 'Learning Outcome 2',
//                   value: 'Value for Learning Outcome 2',
//                 },
//                 {
//                   name: 'Learning Outcome 3',
//                   value: 'Value for Learning Outcome 3',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     ],
//   },

// ];

const DashBoard = ({navigation}) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const homeData = useSelector(state => state.home);
  const navigateToCourses = department => {
    // Find the department object by name
    // const department = Departments.find(dept => dept.name === departmentName);
    // Perform navigation to courses screen with departmentName, Departments, and courses

    navigation.navigate('Courses', {
      department: department.id, // Pass the department ID
      departments: department.name, // Pass the department name
      // You may also want to pass courses data here
      // You can fetch courses from Firestore based on departmentName
      // courses: department.courses,
    });
  };

  useEffect(() => {
    const departmentCollectionRef = firestore().collection('Departments');
    let departmentQuery = departmentCollectionRef;
    if (homeData.role !== 'Super Admin' && homeData.department) {
      // Filter the departments where the department field matches homedata.dept
      departmentQuery = departmentQuery.where(
        'name',
        '==',
        homeData.department,
      );
    }
    departmentQuery
      .get()
      .then(querySnapshot => {
        const dept = [];
        querySnapshot.forEach(documentSnapshot => {
          dept.push({
            ...documentSnapshot.data(),
          });
        });
        setDepartments(dept);
        setLoading(false);
        // console.log("departments",departments )
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
        setLoading(false);
      });
  }, [homeData.department, homeData.role]);
  return (
    <View style={styles.container}>
      <DrawerNavigation navigation={navigation} />
      <View>
        <View style={{marginTop: 10}}>
          <Image
            source={require('../assets/images/Departments.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.scrollViewContent}>
        {loading ? ( // Check if loading is true, display loading text
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              {departments.map((department, index) => (
                <TouchableOpacity
                  key={department.id}
                  onPress={() => navigateToCourses(department)}>
                  <View style={styles.depatmentBox}>
                    <Text style={styles.DepartText}>{department.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          )}
          <Text style={{color: '#000', opacity: 0.3, textAlign: 'center'}}>
            Scroll to view more Departments
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DashBoard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Adjust as needed
    height: 400,
  },
  depatmentBox: {
    backgroundColor: '#ffffff', // Add background color if necessary
    elevation: 8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#C4C4C4',
    width: Dimensions.get('window').width - 2 * 25,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 25,
    paddingVertical: 5,
  },
  loadingText:{
    color: "#003B70",
    textAlign: "center",
    fontSize: 30,
    marginVertical: 30
  },
  DepartText: {
    fontSize: 22,
    marginVertical: 10,
    color: '#000',
    textAlign: 'center',
  },
  img: {
    width: Dimensions.get('window').width - 2 * 10,
    marginHorizontal: 10,
  },
});
