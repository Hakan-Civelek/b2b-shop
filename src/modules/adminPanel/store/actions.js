import axios from 'haxios';

export default {
  uploadImage(_, data) {
    return axios.post('/image', data);
  },
}