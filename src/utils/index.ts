import { scaleText } from 'react-native-text';
import { useToast } from 'react-native-toast-notifications';
import ImagePicker from 'react-native-image-crop-picker';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export const capitalizeFirstLetter = (str: string) => {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const _scaleText = (fontSize: number) => {
  return scaleText({ fontSize });
}

export const showToast = ({ title = "", type = "success" }: { title?: string, type?: string }) => {
  const toast = useToast();
  try {
    toast.show('',
      {
        type: "custom_toast",
        animationDuration: 100,
        data: {
          title: title,
          type: type
        },
      }
    )
  } catch (error) {
    toast.show('',
      {
        type: "custom_toast",
        animationDuration: 100,
        data: {
          title: title,
          type: type
        },
      }
    )
  }
}

export const Genders = [{
  key: 'male',
  value: 'Male'
},
{
  key: 'female',
  value: 'Female'
}]

export const FavoriteSports = [{
  key: 'cricket',
  value: 'Cricket'
},
{
  key: 'football',
  value: 'Football'
},
{
  key: 'swimming',
  value: 'Swimming'
}]

export const Countries = [{
  key: 'IN',
  value: 'India'
},
{
  key: 'SG',
  value: 'Singapore'
},
{
  key: 'USA',
  value: 'United States'
}]

export const pickImage = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      if (image) {
        resolve(image);
      }
    }).catch((error) => reject(error));
  })
}
export const initializeNotifications = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      messaging().onMessage(async remoteMessage => {
        console.log('onMessage A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log("onNotificationOpenedApp remoteMessage-=====", remoteMessage)
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          console.log("getInitialNotification remoteMessage-=====", remoteMessage)
        });
      await setupFCM();
      await getDeviceToken();
    }
  }
  requestUserPermission();
}

const getDeviceToken = async () => {
  console.log("token", messaging().isDeviceRegisteredForRemoteMessages)
  if (messaging().isDeviceRegisteredForRemoteMessages) {
    try {
      const FCMToken = await messaging().getToken();
      console.log("FCMToken", FCMToken);
      messaging().onTokenRefresh(async (refreshedToken) => {
        console.log("refreshedToken", refreshedToken)
      })
    } catch (error) {
      console.log("error", error)
    }
  }
}

const setupFCM = async () => {
  if (Platform.OS === 'ios' && !messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
}
