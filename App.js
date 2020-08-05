/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import PDFListScreen from './Screens/PDFListScreen';
import PDFViewerScreen from './Screens/PDFViewerScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// StackNavigator is for Navigation one to another Screen
// here PDFListScreen and PDFViewerScreen set for navigate

const App = createStackNavigator(
  {
    PDFListScreen: {screen: PDFListScreen},
    PDFViewerScreen: {screen: PDFViewerScreen},
  },
  {
    // intial route will set first screen
    initialRouteName: 'PDFListScreen',
    
  },
);
export default createAppContainer(App);
