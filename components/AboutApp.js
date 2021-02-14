import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Praca dyplomowa</Text>
      <Text style={styles.text}>
        Temat: Zastosowanie frameworka React Native do realizacji aplikacji
        mobilnej
      </Text>
      <Text style={styles.text}>Autor: Bartosz Ciąpała</Text>
      <Text style={styles.text}>Opiekun pracy: dr inż. Bartosz Jędrzejec</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  h1: {
    textAlign: 'center',
    padding: 30,
    fontWeight: 'bold',
    fontSize: 30,
  },
  text: {
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#01a792',
    borderColor: '#01a792',
    borderWidth: 0,
    margin: 30,
  },
});

export default AboutApp;
