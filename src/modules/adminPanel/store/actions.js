import axios from 'haxios';

export default {
  uploadImage(_, data) {
    return axios.post('/image', data);
  },
  getDashboardData() {
    return axios.get('/dashboard');
  },
  fetchShop(_, id) {
    return axios.get(`/shop/${id}`);
  },
  updateShop(_, data) {
    return axios.put(`/shop/${data.id}`, data);
  }
}