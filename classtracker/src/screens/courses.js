import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DrawerNavigation from './drawernavigation';
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

const Courses = ({route, navigation}) => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true)
  const homeData = useSelector(state => state.home);
  // Retrieve the selected department from the navigation parameters
  const {departments, department} = route.params;
  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };
  // Find the selected department from the Departments array
  // const selectedDepartment = departments.find(dept => dept.name === department);
  // console.log("coursename", selectedDepartment);
  // Function to navigate to Assignments screen
  const navigateToAssignments = cour => {
    navigation.navigate('Assignments', {
      // department,
      // Departments,
      // courseName: course.name,
      Assign: cour.id,
      name: cour.course_name,
    });
  };
  useEffect(() => {
    if (department) {
      const coursesCollectionRef = firestore().collection('courses');
      let coursesQuery = coursesCollectionRef.where(
        'dept_id',
        '==',
        department,
      );
      if (homeData.role === 'Coordinator' && homeData.class) {
        coursesQuery = coursesQuery.where('course_name', '==', homeData.class);
      }
      coursesQuery
        .get()
        .then(querySnapshot => {
          const courses = [];
          querySnapshot.forEach(documentSnapshot => {
            courses.push({
              ...documentSnapshot.data(),
            });
          });
          // console.log("fetched courses", courses)
          setCourse(courses);
          setLoading(false)
        })
        .catch(error => {
          console.log('Error getting documents: ', error);
          setLoading(false)
        });
    }
  }, [department, homeData.role, homeData.class]);
  return (
    <View style={styles.container}>
      <DrawerNavigation navigation={navigation} />

      <View style={styles.coursebox}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={require('../assets/images/109618.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Courses for {departments}</Text>
      </View>
      {/* Render courses for the selected department */}
      <Text style={styles.coursetext}>Courses</Text>
      <Text
        style={{
          borderBottomColor: 'green',
          borderBottomWidth: 1,
          marginBottom: 15,
        }}></Text>
      <View style={styles.scrollViewContent}>
      {loading ? ( // Check if loading is true, display loading text
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
        <ScrollView>
          {course.map((course, index) => (
            <TouchableOpacity
              key={course.id}
              onPress={() => navigateToAssignments(course)}>
              <View key={index} style={styles.course}>
                <Text style={styles.courseName}>{course.course_name}</Text>

                <Text
                  style={{
                    borderBottomColor: 'green',
                    borderBottomWidth: 1,
                  }}></Text>
              </View>
            </TouchableOpacity>
            // {/* Render assignments for the course */}
            // {course.assignments.map((assignment, index) => (
            //   <Text key={index} style={styles.assignment}>{assignment.name}</Text>
            // ))}
          ))}
        </ScrollView>
          )}
        <Text style={{color: '#000', opacity: 0.3, textAlign: 'center'}}>
          Scroll to view more Courses
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Adjust as needed
    height: 370,
  },
  loadingText:{
    color: "#003B70",
    textAlign: "center",
    fontSize: 30,
    marginVertical: 30
  },
  coursebox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  course: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 21,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginLeft: 10,
  },
  coursetext: {
    fontSize: 30,
    fontWeight: '500',
    color: 'green',
    textAlign: 'center',
    marginBottom: 50,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    color: '#000',
    textAlign: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  assignment: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
});

export default Courses;
