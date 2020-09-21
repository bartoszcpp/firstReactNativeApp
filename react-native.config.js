// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-image-crop-picker': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
  },
};
