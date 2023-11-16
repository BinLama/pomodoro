import { auth } from "../utils/constants";

export const INITIAL_AUTH_STATE = {
  user: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case auth.LOGIN:
      return {
        user: action.payload,
      };
    case auth.LOGOUT:
      return {
        user: null,
      };
    default:
      state;
  }
};
