import React, {useEffect, useState} from 'react';
import {View, Button, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const [textFromStorage, setTextFromStorage] = useState('');
  const isFocused = useIsFocused();

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        setTextFromStorage(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // const _storeData111 = async () => {
  //   try {
  //     console.log('ssss');
  //     await AsyncStorage.setItem('listOfProduct', '');
  //   } catch (err) {
  //     // Error saving data
  //   }
  //   try {
  //     await AsyncStorage.setItem('finalPrice', '');
  //   } catch (err) {
  //     // Error saving data
  //   }
  //   _retrieveData();
  // };

  useEffect(() => {
    _retrieveData();
    // _storeData111();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  return (
    <View>
      <Button
        title="Test skaner"
        onPress={() => navigation.navigate('TestScanner')}
      />
      <Button
        title="Test storage"
        onPress={() => navigation.navigate('TestStorage')}
      />
      <Button
        title="All storage"
        onPress={() => navigation.navigate('AllStorageContainer')}
      />
      <Text>{textFromStorage}</Text>
    </View>
  );
};

export default HomeScreen;
