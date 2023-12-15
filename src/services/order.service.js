import axios from 'axios';

const API_URL = 'https://organizeme-81hv.onrender.com/api/orders/';

class OrderService {

  addOrder(id, customerId, cart, totalCost, status, machineID, quality, noPackets, noBoxes, feedback) {
    return axios.post(API_URL + 'add', {
      id, customerId, cart, totalCost, status, machineID, quality, noPackets, noBoxes, feedback
    });
  }

  listAllOrders() {
    return axios.get(API_URL + 'list');
  }

  // updateOrder function removed as it's commented out in the backend

  updateOrderMachineID(id, machineID) {
    return axios.put(API_URL + 'updateMachineID', {
      id, machineID
    });
  }

  updateOrderStatus(id, status) {
    return axios.put(API_URL + 'updateStatus', {
      id, status
    });
  }

  updateOrderQuality(id, quality) {
    return axios.put(API_URL + 'updateQuality', {
      id, quality
    });
  }

  updateOrderPackaging(id, noPackets, noBoxes) {
    return axios.put(API_URL + 'updatePackaging', {
      id, noPackets, noBoxes
    });
  }

  updateOrderFeedback(id, feedback) {
    return axios.put(API_URL + 'updateFeedback', {
      id, feedback
    });
  }

  deleteOrder(id) {
    return axios.delete(API_URL + 'delete/' + id);
  }
}

export default new OrderService();
