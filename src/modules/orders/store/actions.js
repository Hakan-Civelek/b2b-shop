import axios from 'haxios';

export default {
  fetchOrders() {
    return axios.get('/order');
  }
}