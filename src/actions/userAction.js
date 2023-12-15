// Import necessary action types and UserService
import {
    LIST_USERS_SUCCESS,
    LIST_USERS_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    SET_MESSAGE,
  } from "./types";
  
  import UserService from "../services/user.service";
  
  // Action to list all users
  export const listAllUsers = () => (dispatch) => {
    return UserService.listAllUsers().then(
      (response) => {
        dispatch({
          type: LIST_USERS_SUCCESS,
          payload: { users: response.data },
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
          type: LIST_USERS_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  // Action to update a user
  export const updateUser = (id, username, email, password, address) => (dispatch) => {
    return UserService.updateUser(id, username, email, password, address).then(
      (response) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: response.data,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: 'User updated successfully!',
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
          type: UPDATE_USER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const deleteUser = (id) => (dispatch) => {
    return UserService.deleteUser(id).then(
      (response) => {
        dispatch({
          type: DELETE_USER_SUCCESS,
          payload: { id },
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: 'User deleted successfully!',
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
          type: DELETE_USER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };