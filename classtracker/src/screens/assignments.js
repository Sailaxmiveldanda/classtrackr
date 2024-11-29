import React from 'react';
import {View, Text, StyleSheet,Image, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import DrawerNavigation from './drawernavigation';
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';

const Assignments = ({route, navigation}) => {
  const [assignment, setAssignment] = useState([])
  const [loading, setLoading] = useState(true)
  const {Assign, name} = route.params;
  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };
  // Find the selected department from the Departments array
  // const selectedDepartment = Departments.find(dept => dept.name === department);

  // // Find the selected course from the selected department
  // const selectedCourse = selectedDepartment.courses.find(
  //   course => course.name === courseName,
  // );

  // Function to navigate to the Outcomes screen
  const navigateToOutcomes = Assignment => {
      navigation.navigate('Outcomes', {
        learn: Assignment.id,
        name: Assignment.title,
      });
  };
  
  useEffect(() => {
    if (Assign) {
      const assignmentsCollectionRef = firestore().collection('assignments');

      assignmentsCollectionRef
        .where('course_id', '==', Assign)
        .get()
        .then(querySnapshot => {
          const assignmentsList = [];
          querySnapshot.forEach(documentSnapshot => {
            assignmentsList.push({
              ...documentSnapshot.data(),
            });
          });
          setAssignment(assignmentsList);
          setLoading(false)
          // console.log("assignments", assignmentsList)
        })
        .catch(error => {
          console.log('Error getting documents: ', error);
          setLoading(false)
        });
    }
  }, [Assign]);
  return (
    <View style={styles.container}>
      <DrawerNavigation navigation={navigation} />
      <View style={styles.assesmentbox}>
        <TouchableOpacity onPress={goBack}>
        <Image
          source={require('../assets/images/109618.png')}
          style={styles.img}
        />
        </TouchableOpacity>
        <Text style={styles.heading}>Assignments for {name}</Text>
      </View>
    
      <Text style={styles.assignmentText}>Assessments</Text>
      <Text
                style={{
                  borderBottomColor: 'green',
                  borderBottomWidth: 1,
                  marginBottom: 15,
                }}></Text>
      <View style={styles.scrollViewContent}>
        {loading ? (
<Text  style={styles.loadingText}>Loading...</Text>
        ) : (
        <ScrollView>
      {assignment.map((assignment, index) => (
          <TouchableOpacity
            key={assignment.id}
            onPress={() => navigateToOutcomes(assignment)}>
            <View key={index} style={styles.assignment}>
              <Text style={styles.assignmentName}>{assignment.title}</Text>
              {/* You can add more details about each assignment if needed */}
              <Text
                style={{
                  borderBottomColor: 'green',
                  borderBottomWidth: 1,
                }}></Text>
            </View>
          </TouchableOpacity>
        ))}
         </ScrollView>
         )}
     <Text style={{color: "#000", opacity: 0.3, textAlign: "center"  }}>Scroll to view more Assignments</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Adjust as needed
    height: 370
  },
  loadingText:{
    color: "#003B70",
    textAlign: "center",
    fontSize: 30,
    marginVertical: 30
  },
  assesmentbox:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    fontSize: 24,
    fontWeight: '500',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'green',
    marginBottom: 50,
    width: Dimensions.get('window').width - 2 * 25,
    color: '#000',
    textAlign: 'center',
    marginTop: 40,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 21,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginLeft:10
  },
  assignmentText:{
    fontSize: 30,
    fontWeight: '500',
    color: "green",
    textAlign: "center",
    marginBottom: 50,
  },
  assignment: {
    marginBottom: 20,
  },
  img:{
    width: 30,
    height: 30
      },
  assignmentName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    color: '#000',
    textAlign: 'center',
  },
  
});

export default Assignments;
