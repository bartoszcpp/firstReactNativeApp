import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
// import ProgressCircle from 'react-native-progress/Circle';
import RNTextDetector from 'react-native-text-detector';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function TestScanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  //const [text, setText] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const [firstProduct, setFirstProduct] = useState(true);

  const [countProduct, setCountProduct] = useState(0);

  const [listOfProduct, setListOfProduct] = useState([]);

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);

    try {
      const visionResp = await RNTextDetector.detectFromUri(path);

      if (typeof visionResp[0] === 'undefined') {
        setError('Błąd podczas skanowania, spróbuj jeszcze raz skanując cene.');
        setIsLoading(false);
      } else {
        //setText(visionResp[0].text);
        let text = visionResp[0].text;
        console.log(`${typeof text} - typeof text`);
        console.log(`${text} - text`);
        let number = parseInt(text, 10);
        console.log(`${number} - number`);
        setIsLoading(false);
        //let isNanValue = isNaN(number);
        if (isNaN(number) === true) {
          setError('Spróbuj zeskanować liczbę zamiast tekstu!');
        } else {
          setFirstProduct(false);
          setError('');
          //setListOfProduct(listOfProduct.concat(text));
          //console.log(`${JSON.stringify(listOfProduct)} - listOfProduct`);
          let newProduct = {id: countProduct, value: text};
          //let newElement = [...listOfProduct, newProduct];
          setListOfProduct([...listOfProduct, newProduct]);
          console.log(`${JSON.stringify(listOfProduct)} - listOfProduct`);
          setCountProduct(countProduct + 1);
          setPrice(price + number);
        }

        console.log(`${visionResp[0].text} - tekst`);
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
      console.log(imgSrc);
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  // useEffect(() => {

  // }

  const listOfProductMap = listOfProduct.map((product) => (
    <Text key={product.id}>
      {`Produkt${product.id}:  `}
      {product.value}
    </Text>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.instructions}>
        {firstProduct === true ? (
          <Text>Dodaj pierwszy produkt</Text>
        ) : (
          <Text>Dodaj kolejny produkt</Text>
        )}
      </View>
      <Text>{error}</Text>
      <View style={styles.options}>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Aparat"
            onPress={() => {
              recognizeFromCamera();
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Galeria"
            onPress={() => {
              recognizeFromPicker();
            }}
          />
        </View>
      </View>
      {imgSrc && (
        <View style={styles.imageContainer}>
          {/* <Image style={styles.image} source={imgSrc} /> */}
          {isLoading ? (
            <Text>Ładowanie, proszę czekać</Text>
          ) : (
            <View>
              <Text>{`Łączna cena: ${price}`}</Text>
            </View>
          )}
        </View>
      )}
      <View>{listOfProductMap}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default TestScanner;
