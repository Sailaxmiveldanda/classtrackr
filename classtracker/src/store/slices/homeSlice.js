import {createSlice} from '@reduxjs/toolkit';

// Initial state
const homeInit = {
  username: '',
  password: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  class: '',
  roleNumber: '',
  role: '',
  department: '',
};

// User slice
export const homeSlice = createSlice({
  name: 'home',
  initialState: homeInit,
  reducers: {
    // Set onboarding data
    setCred: (state, action) => {
      const userData = action.payload; // Data retrieved from the backend
      state.username = userData.username;
      state.password = userData.password;
      state.firstName = userData.firstName;
      state.middleName = userData.middleName;
      state.lastName = userData.lastName;
      state.email = userData.email;
      state.phone = userData.phone;
      state.class = userData.class;
      state.roleNumber = userData.roleNumber;
      state.role = userData.role;
      state.department = userData.department;
    },
    updateCred: (state, action) => {
      state.firstName = action.payload.firstName;
      state.middleName = action.payload.middleName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.class = action.payload.class;
      state.roleNumber = action.payload.roleNumber;
      state.role = action.payload.role;
      state.department = action.payload.department;
    },
  },
});

// Actions
export const {setCred, updateCred} = homeSlice.actions;

// Reducer
export default homeSlice.reducer;
