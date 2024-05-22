import axios from 'haxios';

export default {
  fetchTableDatas(_, fetchParams) {
    return axios.get(`${fetchParams.url}`);
  },
  deleteTableData(_, deleteParams) {
    return axios.delete(`${deleteParams.url}`);
  }
}
