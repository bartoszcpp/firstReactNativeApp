import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Skanuj produkt"
          onPress={() => navigation.navigate('TestScanner')}
          color="transparent"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Wyświetl historie zakupów"
          onPress={() => navigation.navigate('AllStorageContainer')}
          color="transparent"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Informacje o aplikacji"
          onPress={() => navigation.navigate('AboutApp')}
          color="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: '#01a792',
    borderColor: '#01a792',
    borderWidth: 0,
    margin: 30,
  },
});

export default HomeScreen;
