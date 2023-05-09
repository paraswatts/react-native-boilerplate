import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@services/models";
/**
 * ? Local Imports
 */

export interface InitialState {
  userData: IUser | null;
  loading: boolean;

}

const initialState: InitialState = {
  userData: null,
  loading: false
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IUser>) {
      state.userData = null;
      state.userData = action.payload;
    },
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
  },
});

export const { setUserData, showLoading, hideLoading } = userReducer.actions;

export default userReducer.reducer;
