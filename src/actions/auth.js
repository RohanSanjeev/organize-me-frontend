import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  LIST_ROLES_SUCCESS,
  LIST_ROLES_FAIL,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (id, username, email, password, roles, address) => (dispatch) => {
  return AuthService.register(id, username, email, password, roles, address).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const listAllRoles = () => {
  return AuthService.listAllRoles().then(
    (response) => {
      // Simply returning the response here
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = 
        (error.response &&
         error.response.data &&
         error.response.data.message) ||
        error.message ||
        error.toString();

      // Instead of dispatching, simply reject with the message
      return Promise.reject(message);
    }
  );
};
