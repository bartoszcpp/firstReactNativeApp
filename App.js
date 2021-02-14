import 'react-native-gesture-handler';
import React from 'react';
import TestScanner from './components/TestScanner';
import HomeScreen from './components/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AllStorageContainer from './components/AllStorageContainer';
import AboutApp from './components/AboutApp';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Store app">
        <Stack.Screen
          name="Store app - Bartosz Ciąpała"
          component={HomeScreen}
        />
        <Stack.Screen name="TestScanner" component={TestScanner} />
        <Stack.Screen
          name="AllStorageContainer"
          component={AllStorageContainer}
        />
        <Stack.Screen name="AboutApp" component={AboutApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
