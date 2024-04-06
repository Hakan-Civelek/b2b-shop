import axios from 'haxios';

export default {
  fetchTableDatas(_, fetchParams) {
    return axios.get(`${fetchParams.url}`);
  },
}
