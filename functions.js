import AsyncStorage from '@react-native-async-storage/async-storage';

const _storeData = async (listStorage, priceStorage, _retrieveData) => {
  try {
    await AsyncStorage.setItem('listOfProduct', JSON.stringify(listStorage));
  } catch (err) {
    // Error saving data
  }
  try {
    await AsyncStorage.setItem('finalPrice', priceStorage.toString());
  } catch (err) {
    // Error saving data
  }
  _retrieveData();
};

export const handleRemoveItemFromList = (
  product,
  listOfProductFromStorage,
  priceFromStorage,
  _retrieveData,
) => {
  const ID = product.id;
  const value = product.value;
  const index = listOfProductFromStorage.findIndex(
    // eslint-disable-next-line no-shadow
    (product) => product.id === ID,
  );

  listOfProductFromStorage.splice(index, 1);
  const finalPrice = priceFromStorage - value * product.quantity;

  _storeData(listOfProductFromStorage, finalPrice, _retrieveData);
};

export const handleChangeQuantity = (
  product,
  listOfProductFromStorage,
  priceFromStorage,
  _retrieveData,
  count,
) => {
  const value = product.value;
  const ID = product.id;
  const index = listOfProductFromStorage.findIndex(
    // eslint-disable-next-line no-shadow
    (product) => product.id === ID,
  );

  const finalPrice =
    parseInt(priceFromStorage, 10) + count * parseInt(value, 10);

  listOfProductFromStorage[index].quantity =
    listOfProductFromStorage[index].quantity + count;

  _storeData(listOfProductFromStorage, finalPrice, _retrieveData);
};

const _storeData111 = async (_retrieveData1) => {
  console.log('tutaj');
  try {
    await AsyncStorage.setItem('listOfProduct', '');
  } catch (err) {
    // Error saving data
  }
  try {
    await AsyncStorage.setItem('finalPrice', '');
  } catch (err) {
    // Error saving data
  }
  _retrieveData1();
};

export const handleResetItem = (_retrieveData1) => {
  _storeData111(_retrieveData1);
};
