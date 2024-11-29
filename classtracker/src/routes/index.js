//configure routes to the application
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//screens

import Login from '../screens/login';
import Upload from '../screens/upload';
import Profile from '../screens/profile';
import Courses from '../screens/courses';
import Assignments from '../screens/assignments';
import Outcomes from '../screens/outcomes';
import DashBoard from '../screens/dashboard';
import CreateUser from '../screens/createuser';
import ChangePassword from '../screens/change-password';
import ForgotPassword from '../screens/forgot-password';

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Upload"
          component={Upload}
          options={{title: 'Upload'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="CreateUser"
          component={CreateUser}
          options={{title: 'CreateUser'}}
        />
        <Stack.Screen
          name="Courses"
          component={Courses}
          options={{title: 'Courses'}}
        />
        <Stack.Screen
          name="Assignments"
          component={Assignments}
          options={{title: 'Assignments'}}
        />
        <Stack.Screen
          name="Outcomes"
          component={Outcomes}
          options={{title: 'Outcomes'}}
        />
        <Stack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{title: 'DashBoard'}}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{title: 'Change Password'}}
        />
        <Stack.Screen
          name="forgotPassword"
          component={ForgotPassword}
          options={{title: 'Forgot Password'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
