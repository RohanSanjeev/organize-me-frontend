import {
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  LIST_ORDERS_SUCCESS,
  LIST_ORDERS_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_MACHINE_ID_SUCCESS,
  UPDATE_ORDER_MACHINE_ID_FAIL,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  UPDATE_ORDER_QUALITY_SUCCESS,
  UPDATE_ORDER_QUALITY_FAIL,
  UPDATE_ORDER_PACKAGING_SUCCESS,
  UPDATE_ORDER_PACKAGING_FAIL,
  UPDATE_ORDER_FEEDBACK_SUCCESS,
  UPDATE_ORDER_FEEDBACK_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  SET_MESSAGE,
} from "../actions/types"; // Ensure this path is correct
  
  const initialState = {
    orders: [],
    message: ""
  };
  
  export default function orderReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_ORDER_SUCCESS:
        return {
          ...state,
          orders: [...state.orders, payload.order],
          message: "Order added successfully"
        };
  
      case ADD_ORDER_FAIL:
        return {
          ...state,
          message: "Failed to add order"
        };
  
      case LIST_ORDERS_SUCCESS:
        return {
          ...state,
          orders: payload.orders,
          message: "Orders listed successfully"
        };
  
      case LIST_ORDERS_FAIL:
        return {
          ...state,
          message: "Failed to list orders"
        };
  
      case UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          orders: state.orders.map(order => 
            order.id === payload.id ? { ...order, ...payload } : order
          ),
          message: "Order updated successfully"
        };
  
      case UPDATE_ORDER_FAIL:
        return {
          ...state,
          message: "Failed to update order"
        };
  
      case UPDATE_ORDER_MACHINE_ID_SUCCESS:
        return {
          ...state,
          orders: state.orders.map(order => 
            order.id === payload.id ? { ...order, machineID: payload.machineID } : order
          ),
          message: "Order machine ID updated successfully"
        };
  
      case UPDATE_ORDER_MACHINE_ID_FAIL:
        return {
          ...state,
          message: "Failed to update order machine ID"
        };
  
      case UPDATE_ORDER_STATUS_SUCCESS:
        return {
          ...state,
          orders: state.orders.map(order => 
            order.id === payload.id ? { ...order, status: payload.status } : order
          ),
          message: "Order status updated successfully"
        };
  
      case UPDATE_ORDER_STATUS_FAIL:
        return {
          ...state,
          message: "Failed to update order status"
        };
  
        case UPDATE_ORDER_QUALITY_SUCCESS:
          return {
            ...state,
            orders: state.orders.map(order =>
              order.id === payload.id ? { ...order, quality: payload.quality } : order
            ),
            message: "Order quality updated successfully"
          };
        case UPDATE_ORDER_QUALITY_FAIL:
          return {
            ...state,
            message: "Failed to update order quality"
          };
        case UPDATE_ORDER_PACKAGING_SUCCESS:
          return {
            ...state,
            orders: state.orders.map(order =>
              order.id === payload.id ? { ...order, noPackets: payload.noPackets, noBoxes: payload.noBoxes } : order
            ),
            message: "Order packaging updated successfully"
          };
        case UPDATE_ORDER_PACKAGING_FAIL:
          return {
            ...state,
            message: "Failed to update order packaging"
          };
        case UPDATE_ORDER_FEEDBACK_SUCCESS:
          return {
            ...state,
            orders: state.orders.map(order =>
              order.id === payload.id ? { ...order, feedback: payload.feedback } : order
            ),
            message: "Order feedback updated successfully"
          };
        case UPDATE_ORDER_FEEDBACK_FAIL:
          return {
            ...state,
            message: "Failed to update order feedback"
          };
        case DELETE_ORDER_SUCCESS:
          return {
            ...state,
            orders: state.orders.filter(order => order.id !== payload.id),
            message: "Order deleted successfully"
          };
        case DELETE_ORDER_FAIL:
          return {
            ...state,
            message: "Failed to delete order"
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
  