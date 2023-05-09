declare module "react-native-social-buttons";
import { trans as translation } from "shared/localization";

type ToastType = import("react-native-toast-notifications").ToastType;

declare global {
  const toast: ToastType;
  const showToast: ({ title?: string, type?: string })=> void;
  const trans: typeof translation;
  declare module NodeJS {
    export interface Global extends NodeJS.Global {
      toast: ToastType;
      showToast: ({ title?: string, type?: string })=> void;
      trans: typeof translation;
    }
  }
}
