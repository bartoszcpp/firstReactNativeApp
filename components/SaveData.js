import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleResetItem} from '../functions';

const SaveData = (props) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    setCurrentDate(date + '/' + month + '/' + year);
  }, []);

  const {listStorage, _retrieveData1} = props;

  const _retrieveData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('allDataProduct');
      if (value1 !== null) {
        _storeAllData(listStorage, currentDate, value1);
      } else {
        const nullek = null;
        _storeAllData(listStorage, currentDate, nullek);
      }
    } catch (err) {
      // Error retrieving data
    }
  };

  const _storeAllData = async (
    // eslint-disable-next-line no-shadow
    listStorage,
    // eslint-disable-next-line no-shadow
    currentDate,
    // eslint-disable-next-line no-shadow
    allDataFromStorage,
  ) => {
    const newItem = {product: listStorage, date: currentDate};
    const newObject = {item: [{product: listStorage, date: currentDate}]};
    if (allDataFromStorage !== null) {
      const mirrorAllDataFromStorage = JSON.parse(allDataFromStorage);
      mirrorAllDataFromStorage.item.push(newItem);
      try {
        await AsyncStorage.setItem(
          'allDataProduct',
          JSON.stringify(mirrorAllDataFromStorage),
        );
        handleResetItem(_retrieveData1);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await AsyncStorage.setItem('allDataProduct', JSON.stringify(newObject));
        handleResetItem(_retrieveData1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSaveData = () => {
    _retrieveData();
  };

  const handleResetData = () => {
    handleResetItem(_retrieveData1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Zaakceptuj zakupy" onPress={() => handleSaveData()} />
      </View>
      <View style={styles.button}>
        <Button title="Odrzuć zakupy" onPress={() => handleResetData()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default SaveData;
