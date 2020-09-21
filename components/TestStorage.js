import React, {useEffect, useState} from 'react';
import {AsyncStorage, TextInput, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TestStorage = () => {
  const [text, setText] = useState('');
  const [textFromStorage, setTextFromStorage] = useState('');
  const [callUseEffect, setCallUseEffect] = useState('');

  useEffect(() => {
    console.log('sasasas');
    setTextFromStorage(JSON.stringify(AsyncStorage.getItem('name')));
    try {
      const value = AsyncStorage.getItem('TASKS');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }, [callUseEffect]);

  const onChangeTextStorage = () => {
    console.log('lol');
    try {
      setCallUseEffect(text);
      console.log(`${callUseEffect}-tu`);
      AsyncStorage.setItem('name', text);
      console.log(AsyncStorage.getItem('name'));
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View>
      <TextInput
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <TouchableOpacity onPress={() => onChangeTextStorage()}>
        <Text> SAVE VALUE </Text>
      </TouchableOpacity>
      <Text>{textFromStorage}</Text>
    </View>
  );
};

export default TestStorage;
