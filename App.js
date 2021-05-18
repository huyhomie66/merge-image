import React from 'react';
import {SafeAreaView, StyleSheet, Button, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNImageToPdf from 'react-native-image-to-pdf';
import Pdf from 'react-native-pdf';
import {useState} from 'react';

const {height} = Dimensions.get('window');

const App = () => {
  const [PDF, setPDF] = useState();

  const myAsyncPDFFunction = async () => {
    try {
      const options = {
        imagePaths: ['/cat.jpg', '/angrycat.jpg'],
        name: 'Image',
        maxSize: {
          width: 900,
          height: Math.round((height / height) * 900),
        },
        quality: 0.7,
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      console.log({RNImageToPdf});

      if (pdf) {
        setPDF(pdf.filePath);
      }
      console.log(pdf.filePath);
    } catch (e) {
      console.log(e);
    }
  };

  let source = require('./test.pdf'); // TEST
  let pdfSource = {
    uri: PDF,
  }; // TEST

  return (
    <SafeAreaView>
      <Button onPress={myAsyncPDFFunction} title="gen pdf" />
      {PDF && (
        <Pdf
          source={pdfSource || source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
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
