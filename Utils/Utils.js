import {Platform, PermissionsAndroid} from 'react-native';

/**
 * checkPermission is use for check WRITE_EXTERNAL_STORAGE permission is allow or not \
 * also asking for permission in android device
 * Plarform is check OS of user
 */
export const checkPermission = async () => {
  if (Platform.OS === 'ios') {
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download PDF',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted.');
      } else {
        // eslint-disable-next-line no-alert
        alert('Storage Permission Not Granted');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
