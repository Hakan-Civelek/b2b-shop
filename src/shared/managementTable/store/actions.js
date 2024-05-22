import axios from 'haxios';

export default {
  fetchTableDatas(_, fetchParams) {
    return axios.get(`${fetchParams.url}`);
  },
  deleteTableData(_, deleteParams) {
    return axios.delete(`${deleteParams.url}`);
  },
  addItem(_, addParams) {
    return axios.post(`${addParams.url}`, addParams.data);
  },
  updateItem(_, updateParams) {
    return axios.put(`${updateParams.url}`, updateParams.data);
  }
}
