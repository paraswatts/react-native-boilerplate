import { scaleText } from 'react-native-text';
import { useToast } from 'react-native-toast-notifications';
import ImagePicker from 'react-native-image-crop-picker';

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
