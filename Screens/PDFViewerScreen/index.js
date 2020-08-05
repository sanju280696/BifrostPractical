import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

// this Pdf will use for show the Pdf
import Pdf from 'react-native-pdf';
// const editJsonFile = require('edit-json-file');
/**
 * This screen will show the PDF opened by user
 */

class PDFViewerScreen extends Component {
  // Constructor
  constructor(props) {
    super(props);

    // set state of props
    // pdfName is name Pdf
    // pdfUri is Url of Pdf
    this.state = {
      pdfName: this.props.navigation.state.params.pdfName,
      pdfUri: this.props.navigation.state.params.uri,
    };
  }

  static navigationOptions = {
    //Sets Header text of Status Bar
    title: 'PdfView',
  };

  render() {
    // get uri from state
    let uri = this.state.pdfUri;

    // set source for Pdf with enable cache
    const source = {uri, cache: true};
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          marginTop: 25,
        }}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log('error', error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    );
  }
}
export default PDFViewerScreen;

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
