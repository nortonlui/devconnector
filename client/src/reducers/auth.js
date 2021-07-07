import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
