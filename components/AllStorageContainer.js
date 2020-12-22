import React, {useState, useEffect} from 'react';
import AllStorage from './AllStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const AllStorageContainer = () => {
  const [allStorage, setAllStorage] = useState([]);

  const _retrieveData = async () => {
    try {
      const value4 = await AsyncStorage.getItem('allDataProduct');
      console.log(value4);
      if (value4 !== null) {
        setAllStorage(JSON.parse(value4));
        console.log(JSON.parse(value4) + 'llll');
      }
    } catch (err) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  if (allStorage.item !== undefined) {
    var allStorageMap = allStorage.item.map((product) => {
      return (
        <AllStorage
          key={product.product[0].id}
          id={product.product[0].id}
          date={product.date}
          product={product.product}
        />
      );
    });
    //wyswietlanie wszystkich zakupow
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{allStorageMap}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default AllStorageContainer;
