import {
  LIST_USERS_SUCCESS,
  LIST_USERS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  SET_MESSAGE,
} from "../actions/types"; // Ensure this path is correct

const initialState = {
  users: [],
  message: ""
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIST_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        message: "Users listed successfully"
      };

    case LIST_USERS_FAIL:
      return {
        ...state,
        message: "Failed to list users"
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user => 
          user.id === payload.id ? { ...user, ...payload } : user
        ),
        message: "User updated successfully"
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        message: "Failed to update user"
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user.id !== payload.id),
        message: "User deleted successfully"
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        message: "Failed to delete user"
      };

    case SET_MESSAGE:
      return {
        ...state,
        message: payload
      };

    default:
      return state;
  }
}