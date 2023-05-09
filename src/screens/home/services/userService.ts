import { updateAuthToken } from "@api";
import { IUser } from "@services/models";
import { ReduxServices } from "@services/redux/ReduxService";
import { setUserData, showLoading, hideLoading } from "@services/redux/user/UserReducers";
class UserServiceState {
  setUserData = (userData: IUser) => {
    userData && ReduxServices.dispatchAction(setUserData(userData));
  };
  showLoading = () => {
    ReduxServices.dispatchAction(showLoading());
  };
  hideLoading = () => {
    ReduxServices.dispatchAction(hideLoading());
  };
}

const UserService = new UserServiceState();

export default UserService;
