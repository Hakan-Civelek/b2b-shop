import axios from 'haxios';

export default {
  fetchBasket() {
    return axios.get('/basket');
  },
  addBasket(_, product) {
    return axios.post('/basket/addItem', product);
  },
  removeItemFromBasket(_, params) {
    return axios.post('/basket/removeItem', params);
  },
  cleanBasket() {
    return axios.post('/basket/cleanBasket');
  }
}