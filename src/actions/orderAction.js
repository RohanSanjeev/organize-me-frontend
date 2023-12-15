// Import action types
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
  } from './types';
  
  // Import your OrderService
  import OrderService from '../services/order.service';
  
  // Add Order Action
  export const addOrder = (id, customerId, cart, totalCost, acceptance, status, machineID, quality, noPackets, noBoxes, feedback) => (dispatch) => {
    return OrderService.addOrder(id, customerId, cart, totalCost, acceptance, status, machineID, quality, noPackets, noBoxes, feedback)
      .then(response => {
        dispatch({
          type: ADD_ORDER_SUCCESS,
          payload: { order: response.data },
        });
  
        console.log('Add Order Success:', response);
        return Promise.resolve();
      })
      .catch(error => {
        const message = error.response?.data?.message || error.message || error.toString();
  
        dispatch({
          type: ADD_ORDER_FAIL,
        });
  
        console.error('Add Order Error:', message);
        return Promise.reject(message);
      });
  };
  
  // List All Orders Action
  export const listAllOrders = () => (dispatch) => {
    return OrderService.listAllOrders()
      .then(response => {
        dispatch({
          type: LIST_ORDERS_SUCCESS,
          payload: { orders: response.data },
        });
  
        console.log('List Orders Success:', response);
        return Promise.resolve();
      })
      .catch(error => {
        const message = error.response?.data?.message || error.message || error.toString();
  
        dispatch({
          type: LIST_ORDERS_FAIL,
        });
  
        console.error('List Orders Error:', message);
        return Promise.reject(message);
      });
  };
  
  // // Update Order Action
  // export const updateOrder = (id, cart, totalCost, quality, noPackets, noBoxes, feedback) => (dispatch) => {
  //   return OrderService.updateOrder(id, cart, totalCost, quality, noPackets, noBoxes, feedback)
  //     .then(response => {
  //       dispatch({
  //         type: UPDATE_ORDER_SUCCESS,
  //         payload: { order: response.data },
  //       });
  
  //       console.log('Update Order Success:', response);
  //       return Promise.resolve();
  //     })
  //     .catch(error => {
  //       const message = error.response?.data?.message || error.message || error.toString();
  
  //       dispatch({
  //         type: UPDATE_ORDER_FAIL,
  //       });
  
  //       console.error('Update Order Error:', message);
  //       return Promise.reject(message);
  //     });
  // };
  
// Update Order Machine ID Action
export const updateOrderMachineID = (id, machineID) => (dispatch) => {
    return OrderService.updateOrderMachineID(id, machineID)
      .then(response => {
        dispatch({
          type: UPDATE_ORDER_MACHINE_ID_SUCCESS,
          payload: { id, machineID },
        });
  
        console.log('Update Order Machine ID Success:', response);
        return Promise.resolve();
      })
      .catch(error => {
        const message = error.response?.data?.message || error.message || error.toString();
  
        dispatch({
          type: UPDATE_ORDER_MACHINE_ID_FAIL,
        });
  
        console.error('Update Order Machine ID Error:', message);
        return Promise.reject(message);
      });
  };
  
  // Update Order Status Action
  export const updateOrderStatus = (id, status) => (dispatch) => {
    return OrderService.updateOrderStatus(id, status)
      .then(response => {
        dispatch({
          type: UPDATE_ORDER_STATUS_SUCCESS,
          payload: { id, status },
        });
  
        console.log('Update Order Status Success:', response);
        return Promise.resolve();
      })
      .catch(error => {
        const message = error.response?.data?.message || error.message || error.toString();
  
        dispatch({
          type: UPDATE_ORDER_STATUS_FAIL,
        });
  
        console.error('Update Order Status Error:', message);
        return Promise.reject(message);
      });
  };
  

  // Update Order Quality Action
export const updateOrderQuality = (id, quality) => (dispatch) => {
  return OrderService.updateOrderQuality(id, quality)
    .then(response => {
      dispatch({
        type: UPDATE_ORDER_QUALITY_SUCCESS,
        payload: { id, quality },
      });

      console.log('Update Order Quality Success:', response);
      return Promise.resolve();
    })
    .catch(error => {
      const message = error.response?.data?.message || error.message || error.toString();

      dispatch({
        type: UPDATE_ORDER_QUALITY_FAIL,
      });

      console.error('Update Order Quality Error:', message);
      return Promise.reject(message);
    });
};

// Update Order Packaging Action
export const updateOrderPackaging = (id, noPackets, noBoxes) => (dispatch) => {
  return OrderService.updateOrderPackaging(id, noPackets, noBoxes)
    .then(response => {
      dispatch({
        type: UPDATE_ORDER_PACKAGING_SUCCESS,
        payload: { id, noPackets, noBoxes },
      });

      console.log('Update Order Packaging Success:', response);
      return Promise.resolve();
    })
    .catch(error => {
      const message = error.response?.data?.message || error.message || error.toString();

      dispatch({
        type: UPDATE_ORDER_PACKAGING_FAIL,
      });

      console.error('Update Order Packaging Error:', message);
      return Promise.reject(message);
    });
};


// Update Order Feedback Action
export const updateOrderFeedback = (id, feedback) => (dispatch) => {
  return OrderService.updateOrderFeedback(id, feedback)
    .then(response => {
      dispatch({
        type: UPDATE_ORDER_FEEDBACK_SUCCESS,
        payload: { id, feedback },
      });

      console.log('Update Order Feedback Success:', response);
      return Promise.resolve();
    })
    .catch(error => {
      const message = error.response?.data?.message || error.message || error.toString();

      dispatch({
        type: UPDATE_ORDER_FEEDBACK_FAIL,
      });

      console.error('Update Order Feedback Error:', message);
      return Promise.reject(message);
    });
};


export const deleteOrder = (id) => (dispatch) => {
  return OrderService.deleteOrder(id)
    .then(response => {
      dispatch({
        type: DELETE_ORDER_SUCCESS,
        payload: { id },
      });

      console.log('Delete Order Success:', response);
      return Promise.resolve();
    })
    .catch(error => {
      const message = error.response?.data?.message || error.message || error.toString();

      dispatch({
        type: DELETE_ORDER_FAIL,
      });

      console.error('Delete Order Error:', message);
      return Promise.reject(message);
    });
};