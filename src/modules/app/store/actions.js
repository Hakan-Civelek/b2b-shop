import axios from 'haxios';

export default {
	login(_, payload) {
		return axios.post('/login', payload);
	},
	testMethod() {
		return axios.get('/posts');
	}
}