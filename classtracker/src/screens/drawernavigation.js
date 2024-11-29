import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
const DrawerWidth = Dimensions.get('window').width * 0.6;
import {setCred} from '../store/slices/homeSlice';

const DrawerNavigation = ({navigation}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerPosition] = useState(new Animated.Value(DrawerWidth));
  const dispatch = useDispatch();
  const toggleDrawer = () => {
    Animated.timing(drawerPosition, {
      toValue: isOpen ? DrawerWidth : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(!isOpen);
    });
  };
  const homeData = useSelector(state => state.home);

  return (
    <>
      <Animated.View
        style={[styles.drawer, {transform: [{translateX: drawerPosition}]}]}>
        {/* Drawer content */}
        <View style={styles.drawerContent}>
          <View style={styles.closebtn}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Text style={styles.close}>X</Text>
            </TouchableOpacity>
          </View>
          {homeData.role === 'Super Admin' ? (
            <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
              <Text style={styles.drawerItem}>Upload</Text>
            </TouchableOpacity>
          ) : null}
          {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.drawerItem}>Login</Text>
            </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.drawerItem}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('changePassword')}>
            <Text style={styles.drawerItem}>Reset Password</Text>
          </TouchableOpacity>
          {homeData.role === 'Super Admin' ? (
            <TouchableOpacity onPress={() => navigation.navigate('CreateUser')}>
              <Text style={styles.drawerItem}>Create User</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              dispatch(setCred({username: '', password: ''}));
              navigation.popToTop();
            }}>
            <Text style={styles.drawerItem}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/nlogo.png')}
          style={styles.img}
        />
        <TouchableOpacity onPress={toggleDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DrawerWidth,

    backgroundColor: '#f5f5f5',
    zIndex: 100000,
  },
  drawerContent: {
    flex: 1,
    height: 500,
    padding: 20,
    color: '#fff',
  },
  drawerItem: {
    fontSize: 22,
    marginVertical: 15,
    color: '#000',
    paddingLeft: 15,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: 30,
    height: 30,
  },
  closebtn: {
    marginLeft: 'auto',
  },
  close: {
    fontSize: 25,
    color: '#000',
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuIcon: {
    fontSize: 24,
    color: '#000',
  },
});
