import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import DrawerNavigation from './drawernavigation';
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
import {PieChart} from 'react-native-chart-kit';

function countFrequency(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr.rating.split('--')[0]] =
      (acc[curr.rating.split('--')[0]] || 0) + 1;
    return acc;
  }, {});
}

const Outcomes = ({route, navigation}) => {
  const {learn, name} = route.params;
  const [outCome, setOutCome] = useState([]);
  const [loading, setLoading] = useState(true)
  const [chart, setChart] = useState({});
  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  useEffect(() => {
    if (learn) {
      const assignmentsCollectionRef =
        firestore().collection('learning_outcome');

      assignmentsCollectionRef
        .where('assignment_id', '==', learn)
        .get()
        .then(querySnapshot => {
          const learnList = [];
          querySnapshot.forEach(documentSnapshot => {
            learnList.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setOutCome(learnList);
          setLoading(false)
          // console.log("outcome",learnList);
        })
        .catch(error => {
          console.log('Error getting documents: ', error);
          setLoading(false)
        });
    }
  }, [learn]);

  useEffect(() => {
    if (outCome.length) {
      let grp = {};
      outCome.forEach(item => {
        grp[item.outcome_name] = grp[item.outcome_name] || [];
        grp[item.outcome_name].push(item);
      });
      console.log('1', grp);
      Object.keys(grp).forEach(item => {
        grp[item] = countFrequency(grp[item]);
      });
      // console.log(grp);
      // console.log(countFrequency(Object.values(grp).flat()));
      // console.log(outCome);
      // let hash = countFrequency(outCome);
      let list = {};
      const profMap = {
        'Emerging Proficient': 'green',
        'Highly Proficient': 'orange',
        Proficient: 'yellow',
        'Not Proficient': 'red',
      };

      const randomColor = [
        'blanchedalmond',
        'blue',
        'blueviolet',
        'brown',
        'burlywood',
        'cadetblue',
        'chartreuse',
        'chocolate',
        'coral',
      ];
      console.log(Object.keys(grp).map(item => console.log(item)));
      for (let item in grp) {
        Object.entries(grp[item]).forEach(([key, val]) => {
          list[item] = list[item] || [];
          list[item].push({
            name: key,
            population: val,
            color: profMap[key]
              ? profMap[key]
              : randomColor[Math.floor(Math.random() * randomColor.length)],
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          });
        });
      }
      console.log(list);
      setChart(list);
    }
  }, [outCome]);

  return (
    <View style={styles.container}>
      <DrawerNavigation navigation={navigation} />
      <View style={styles.outcomebox}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={require('../assets/images/109618.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>{name}</Text>
      </View>
      <ScrollView>
        <Text style={styles.outcometext}>Learning Outcomes</Text>
        {loading ? (
<Text  style={styles.loadingText}>Loading...</Text>
        ) : (
        <View style={styles.outcomeList}>
          <Text
            style={{
              borderBottomColor: 'green',
              borderBottomWidth: 1,
              marginBottom: 15,
            }}></Text>
 
          {Object.keys(chart).length
            ? Object.keys(chart).map(item => (
                <View key={item}>
                  <Text style={styles.outcomeTitle}>{item}</Text>
                  <PieChart
                    data={chart[item]}
                    width={350}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={'population'}
                    backgroundColor={'transparent'}
                    paddingLeft={'10'}
                    center={[0, 0]}
                  />
                </View>
              ))
            : null}
     
          {/* {outCome.map((outcome, index) => (
            <View key={outcome.id} style={styles.outcomeItem}>
              <Text style={styles.outcomeTitle}>{outcome.outcome_name}</Text>
              <Text style={styles.outcomeValue}>{outcome.rating}</Text>
              <Text
                style={{
                  borderBottomColor: 'green',
                  borderBottomWidth: 1,
                }}></Text>
            </View>
          ))} */}
        </View>
           )}  
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 21,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginLeft: 10,
  },
  loadingText:{
    color: "#003B70",
    textAlign: "center",
    fontSize: 30,
    marginVertical: 30
  },
  outcomebox: {
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
  outcometext: {
    fontSize: 30,
    fontWeight: '500',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  outcomeList: {
    marginTop: 10,
  },
  outcomeItem: {
    marginBottom: 20,
  },
  outcomeTitle: {
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
  outcomeValue: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
  },
});

export default Outcomes;
