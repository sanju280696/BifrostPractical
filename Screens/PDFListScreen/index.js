import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';

import PDFListComponent from '../../Components/PDFListComponent';
import PDFData from '../../pdfList.json';
import {checkPermission} from '../../Utils/Utils';
import Colors from '../../Utils/Colors';
/**
 * PDFListScreen show the list PDF
 * here we check the permission of as well and ask for Write Storage Permission
 */
class PDFListScreen extends Component {
  constructor(props) {
    super(props);
    // const editJsonFile = require('fs');
  }

  // ask for permission when componentmount method called
  componentDidMount() {
    // located at * Utils file *
    checkPermission();
  }

  // navigationOption sets navigation header style
  static navigationOptions = {
    headerShown: false,
  };

  // rendering here
  // here * PDFData - fetch PDF List from pdfList.json file *
  // props for send data to next screen
  // data_item - send pdfList to PDFListComponent
  // navigate_props - send props to navigate component to another screen

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.importantText}>Important Tutorial</Text>
        <Text style={styles.documentText}>Document</Text>
        <FlatList
          data={PDFData}
          renderItem={({item}) => {
            let props = {
              data_item: item,
              navigate_props: this.props,
            };
            return <PDFListComponent {...props} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          // eslint-disable-next-line react-native/no-inline-styles
          // flatlist issue for bottom view cut that's why set padding bottom to set proper bottom
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeBackgroundColor,
  },
  importantText: {
    textAlign: 'center',
    paddingTop: 50,
    color: Colors.tutorialTextColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
  documentText: {
    color: Colors.documentTextColor,
    paddingTop: 40,
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
// export PDFListScreen
export default PDFListScreen;
