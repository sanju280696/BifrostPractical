import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../Utils/Colors';
// RNFetchBlob enable us to download the pdf file and check whether file exist or not
import RNFetchBlob from 'rn-fetch-blob';

/**
 * This component contain pdf view design which will enable user to download pdf file.
 * By clicking on download icon, it'll let user download file. If downloaded already,
 * pdf file will be opened
 * @param {*} props - get data from PDFListScreen
 */

const PDFListComponent = (props) => {
  /**
   * This method will check if PDF file is already downloaded,
   * if downloaded viewPdf() method will called
   * if not downloded downloadPdf() method will called
   * @param {*} url - url to download
   * @param {*} name - name of pdf
   */

  const checkDownload = (url, name) => {
    const {fs} = RNFetchBlob;

    // Temp use PictureDir for saving PDF file
    let PictureDir = fs.dirs.PictureDir;

    // checking if file exist or not
    RNFetchBlob.fs
      .exists(PictureDir + '/pdf_' + name)
      .then((exist) => {
        // eslint-disable-next-line no-lone-blocks
        {
          exist ? viewPdf(url, name) : downloadPdf(url, name);
        }
      })
      .catch(() => {
        console.log('Error');
      });
  };

  // this will show pdf in PDFViewerScreen
  // here we send URI and PDFName to PDFViewerScreen using navigation
  const viewPdf = (url, name) => {
    props.navigate_props.navigation.navigate('PDFViewerScreen', {
      uri: url,
      pdfName: name,
    });
  };

  // downloadPdf will download the pdf file
  // setup for download will show in notification and its path
  const downloadPdf = (url, name) => {
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/pdf_' + name,
        description: 'Pdf',
      },
    };
    config(options)
      .fetch('GET', url)
      .then((res) => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        // eslint-disable-next-line no-alert
        alert('Pdf Downloaded Successfully.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pdfListContainer}>
        <Image
          style={styles.documentIcon}
          source={require('./icon/ic_document.png')}
        />
        <Text style={styles.titleStyle}> {props.data_item.name}</Text>
        <TouchableOpacity
          onPress={() =>
            checkDownload(props.data_item.url, props.data_item.name)
          }>
          <Image
            style={styles.documentIcon}
            source={require('./icon/ic_download.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.separatorLine} />
    </SafeAreaView>
  );
};

// styles for view with flexbox property

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingRight: 10,
    paddingLeft: 10,
  },
  pdfListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  documentIcon: {
    height: 30,
    width: 30,
  },
  titleStyle: {
    fontSize: 20,
    flex: 1,
    color: Colors.tutorialTitleColor,
    paddingRight: 10,
    paddingLeft: 10,
  },
  separatorLine: {
    backgroundColor: 'red',
    height: 0.5,
    marginRight: 50,
    marginLeft: 50,
    backgroundColor: Colors.separatorLineColor,
    alignContent: 'center',
  },
});
export default PDFListComponent;
