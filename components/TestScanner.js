import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, ScrollView} from 'react-native';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
// import ProgressCircle from 'react-native-progress/Circle';
import RNTextDetector from 'react-native-text-detector';
import {useIsFocused} from '@react-navigation/native';
import ItemFromList from './ItemFromList';
import SaveData from './SaveData';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: false,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function TestScanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const [firstProduct, setFirstProduct] = useState(true);

  const [countProduct, setCountProduct] = useState(0);
  const [countProductFromStorage, setCountProductFromStorage] = useState();

  const [listOfProduct, setListOfProduct] = useState([]);
  const [listOfProductFromStorage, setListOfProductFromStorage] = useState([]);

  const [priceFromStorage, setPriceFromStorage] = useState('');
  const isFocused = useIsFocused();
  const [nameOfProduct, setNameOfProduct] = useState('');

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);

    try {
      const visionResp = await RNTextDetector.detectFromUri(path);

      if (typeof visionResp[0] === 'undefined') {
        setError('Błąd podczas skanowania, spróbuj jeszcze raz skanując cene.');
        setIsLoading(false);
      } else {
        let text = visionResp[0].text;
        let number = parseInt(text, 10);
        setIsLoading(false);
        if (isNaN(number) === true) {
          setError('Spróbuj zeskanować liczbę zamiast tekstu!');
        } else {
          setFirstProduct(false);
          setError('');

          let newProduct = {
            id: countProduct,
            value: text,
            quantity: 1,
            name: nameOfProduct,
          };
          setListOfProduct([...listOfProduct, newProduct]);
          let mirrorListOfProduct = [...listOfProduct, newProduct];

          setCountProduct(countProduct + 1);
          let mirrorCountOfProduct = countProduct + 1;

          setPrice(price + number);
          let mirrorPrice = price + number;

          _storeData(mirrorPrice, mirrorListOfProduct, mirrorCountOfProduct);
        }
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      setImgSrc({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openCamera(options);
      setImgSrc({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const _storeData = async (priceStorage, listStorage, countStorage) => {
    try {
      await AsyncStorage.setItem('finalPrice', priceStorage.toString());
    } catch (err) {
      // Error saving data
    }
    try {
      await AsyncStorage.setItem('listOfProduct', JSON.stringify(listStorage));
    } catch (err) {
      // Error saving data
    }
    try {
      await AsyncStorage.setItem('countOfProduct', countStorage.toString());
    } catch (err) {
      // Error saving data
    }
    _retrieveData();
  };

  const _retrieveData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('finalPrice');
      if (value1 !== null) {
        setPriceFromStorage(value1);
        setPrice(parseInt(value1, 10));
      } else {
        setPriceFromStorage('');
        setPrice(0);
      }
    } catch (err) {
      // Error retrieving data
    }
    try {
      const value2 = await AsyncStorage.getItem('listOfProduct');
      if (value2 !== null) {
        setListOfProductFromStorage(JSON.parse(value2));
        setListOfProduct(JSON.parse(value2));
      } else {
        setListOfProductFromStorage([]);
        setListOfProduct([]);
      }
    } catch (err) {
      // Error retrieving data
    }
    try {
      const value3 = await AsyncStorage.getItem('countOfProduct');
      if (value3 !== null) {
        setCountProductFromStorage(value3);
        setCountProduct(parseInt(value3, 10));
      }
    } catch (err) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    _retrieveData();
  }, [isFocused]);

  const listOfProductMap = listOfProductFromStorage.map((product) => (
    <ItemFromList
      key={product.id}
      product={product}
      listOfProductFromStorage={listOfProductFromStorage}
      priceFromStorage={priceFromStorage}
      _retrieveData={_retrieveData}
    />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.instructions}>
        {firstProduct === true ? (
          <Text style={styles.titleText}>Dodaj pierwszy produkt</Text>
        ) : (
          <Text style={styles.titleText}>Dodaj kolejny produkt</Text>
        )}
      </View>
      <Text>{error}</Text>
      <View style={styles.options}>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Skanuj"
            onPress={() => {
              recognizeFromCamera();
            }}
            color="transparent"
          />
        </View>
      </View>

      <View style={styles.imageContainer}>
        {/* <Image style={styles.image} source={imgSrc} /> */}
        {isLoading ? (
          <Text>Ładowanie, proszę czekać</Text>
        ) : (
          <View>
            <Text
              style={
                styles.imageContainer__price
              }>{`Łączna cena: ${priceFromStorage}`}</Text>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          // eslint-disable-next-line no-shadow
          onChangeText={(text) => setNameOfProduct(text)}
          value={nameOfProduct}
        />

        <Text> Podaj nazwę produktu </Text>
      </View>

      <ScrollView style={styles.list}>{listOfProductMap}</ScrollView>
      <SaveData
        listStorage={listOfProductFromStorage}
        _retrieveData1={_retrieveData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: '100%',
    paddingTop: 30,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#01a792',
  },
  titleText: {
    fontSize: 22,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer__price: {
    fontSize: 28,
  },
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: DEFAULT_WITH / 2.5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  list: {
    height: DEFAULT_HEIGHT / 2.5,
  },
  input: {
    borderBottomColor: '#01a792',
    borderBottomWidth: 2,
  },
  inputContainer: {
    marginBottom: 10,
  },
});

export default TestScanner;
