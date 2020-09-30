import {AsyncStorage} from 'react-native';

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
    (product) => product.id === ID,
  );

  listOfProductFromStorage.splice(index, 1);
  const finalPrice = priceFromStorage - value;

  _storeData(listOfProductFromStorage, finalPrice, _retrieveData);
};

export const handleChangeQuantity = (
  product,
  listOfProductFromStorage,
  priceFromStorage,
  _retrieveData,
  count,
  action,
) => {
  console.log(action);
  const value = product.value;
  const finalPrice = priceFromStorage - count * value;
};
