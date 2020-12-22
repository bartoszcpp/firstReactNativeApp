import React, {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleResetItem} from '../functions';

const SaveData = (props) => {
  const [currentDate, setCurrentDate] = useState('');
  const [allDataFromStorage, setAllDataFromStorage] = useState([]);

  useEffect(() => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    setCurrentDate(date + '/' + month + '/' + year);
    //_retrieveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {listStorage, _retrieveData1} = props;

  const _retrieveData = async () => {
    console.log('1');
    try {
      const value1 = await AsyncStorage.getItem('allDataProduct');
      if (value1 !== null) {
        //setAllDataFromStorage(value1);
        console.log(`${JSON.stringify(value1)}-value1`);
        console.log(`${typeof value1}-typeof value1`);
        _storeAllData(listStorage, currentDate, value1);
      } else {
        const nullek = null;
        console.log('2');
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
    console.log(`${currentDate}-date`);

    //console.log(`${allDataFromStorage}-allData`);
    console.log(`${JSON.stringify(listStorage)}-listStorage`);
    const newItem = {product: listStorage, date: currentDate};
    const newObject = {item: [{product: listStorage, date: currentDate}]};
    const empty = {};
    console.log(`${JSON.stringify(newItem)}-newItem`);
    console.log(allDataFromStorage + ' allDataFromStorage');
    //const mirrorListOfProduct = [...allDataFromStorage, newItem];
    //console.log(`${JSON.stringify(mirrorListOfProduct)}-mirrorListOfProduct`);

    if (allDataFromStorage !== null) {
      const mirrorAllDataFromStorage = JSON.parse(allDataFromStorage);
      //console.log(typeof mirrorAllDataFromStorage);
      //AsyncStorage.clear();
      mirrorAllDataFromStorage.item.push(newItem);
      console.log(
        JSON.stringify(mirrorAllDataFromStorage) + ' if1/allDataFromStorage',
      );
      // const mirrorListOfProduct = {
      //   ...allDataFromStorage,
      //   newItem,
      // };
      // console.log(
      //   JSON.stringify(mirrorListOfProduct) + ' if1/mirrorListOfProduct',
      // );
      try {
        await AsyncStorage.setItem(
          'allDataProduct',
          JSON.stringify(mirrorAllDataFromStorage),
        );
        //AsyncStorage.clear();
        handleResetItem(_retrieveData1);
        console.log('ustawione');
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('dupen szturchen');
      //const mirrorListOfProduct = {newItem};
      //zmienic na {newItem}
      console.log(JSON.stringify(newObject) + ' if2/mirrorListOfProduct');
      try {
        await AsyncStorage.setItem('allDataProduct', JSON.stringify(newObject));
        //AsyncStorage.clear();
        console.log('ustawione');
        handleResetItem(_retrieveData1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSaveData = () => {
    _retrieveData();
    //_storeAllData(listStorage, currentDate, allDataFromStorage);
  };

  return (
    <View>
      <Button title="Zaakceptuj zakupy" onPress={() => handleSaveData()} />
    </View>
  );
};

export default SaveData;
