import React, {useEffect, useState} from 'react';
import {AsyncStorage, TextInput, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TestStorage = () => {
  const [text, setText] = useState('');
  const [textFromStorage, setTextFromStorage] = useState('');
  const [callUseEffect, setCallUseEffect] = useState('');

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
  }, [callUseEffect]);

  const onChangeTextStorage = () => {
    console.log('lol');
    try {
      setCallUseEffect(text);

      AsyncStorage.setItem('name', text);
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View>
      <TextInput
        multiline={true}
        numberOfLines={4}
        // eslint-disable-next-line no-shadow
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
