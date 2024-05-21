import axios from 'haxios';

export default {
  fetchProductDetails(_, id) {
    return axios.get(`/product/${id}`);
  }
}
