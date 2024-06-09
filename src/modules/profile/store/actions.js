import axios from 'haxios';

export default {
  fetchProfile() {
    return axios.get('/user/me');
  },
  updateProfile(_, profile) {
    return axios.put(`/user/${profile.id}`, profile);
  },
  updatePassword(_, password) {
    return axios.put(`/user/updatePassword/${password.id}`, password);
  },
}