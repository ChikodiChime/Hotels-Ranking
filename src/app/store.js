import {configureStore} from '@reduxjs/toolkit'
import hotelReducer from '../features/hotel/hotelSlice'





// Functions to save and load state from local storage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Return undefined to use the default state
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from local storage:', error);
    return undefined; // Return undefined to use the default state
  }
};

const preloadedState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer:hotelReducer,
  preloadedState,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});