import React, {useEffect, useState} from 'react';
import {AsyncStorage, View, Button, Text} from 'react-native';
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

  useEffect(() => {
    _retrieveData();
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
      <Text>{textFromStorage}</Text>
    </View>
  );
};

export default HomeScreen;
