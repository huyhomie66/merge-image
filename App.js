/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Alert,
  Button,
} from 'react-native';
import {DynamicCollage} from 'react-native-images-collage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNImageToPdf from 'react-native-image-to-pdf';

const photos = [
  'https://picsum.photos/400',
  'https://picsum.photos/400',
  'https://picsum.photos/400',
  'https://picsum.photos/400',
  'https://picsum.photos/400',
];

const App = () => {
  const myAsyncPDFFunction = async () => {
    try {
      const options = {
        imagePaths: [require('./cat.jpg'), require('./angrycat.jpg')],
        name: 'Image',
        maxSize: {
          width: 900,
          height: Math.round((deviceHeight() / deviceWidth()) * 900),
        },
        quality: 0.7, // optional compression paramter
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);

      console.log(pdf.filePath);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView>
      <Button onPress={myAsyncPDFFunction} title="gen pdf" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    width: 25,
    height: 25,
    zIndex: 9999,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
