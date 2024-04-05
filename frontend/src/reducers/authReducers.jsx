import { auth } from "../utils/constants";

export const INITIAL_AUTH_STATE = {
  email: null,
  username: null,
  id: null,
  fName: null,
  lName: null,
};

export const authReducer = (state, action) => {
  console.log("payload", action.payload);
  switch (action.type) {
    case auth.LOGIN:
      return {
        ...action.payload,
      };
    case auth.LOGOUT:
      return {
        ...INITIAL_AUTH_STATE,
      };
    default:
      state;
  }
};
