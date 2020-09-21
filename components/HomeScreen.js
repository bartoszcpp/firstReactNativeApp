import React, {useEffect, useState} from 'react';
import {AsyncStorage, View, Button, Text} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [textFromStorage, setTextFromStorage] = useState('');
  useEffect(() => {
    setTextFromStorage(JSON.stringify(AsyncStorage.getItem('name')));
  }, []);
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
