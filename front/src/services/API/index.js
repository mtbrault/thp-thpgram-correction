import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
});

API.interceptors.request.use(({ headers, ...config }) => ({
	...config,
	headers: {
		...headers,
		'Content-Type': 'application/json',
		Authorization: headers.Auhtorization || Cookies.get('token'),
	},
}));

export default class ApiManager {
	static async registerUser(param) {
		const res = await API.post('/users.json', param);
		return res.data;
	}

	static async loginUser(param) {
		const res = await API.post('/users/sign_in.json', param);
		return {
			...res.data,
			token: res.headers.authorization,
		}
	}

	static async logoutUser() {
		const res = await API.delete('/users/sign_out.json');
		return res;
	}

	static async uploadPublication(param) {
		await API.post('/images.json', param);
		return this.getPublications();
	}

	static async getPublications() {
		const res = await API.get('/images.json');
		return {
			publicationList: res.data
		};
	}

	static async deletePublication(id) {
		await API.delete(`/images/${id}.json`);
		return this.getPublications();
	}

	static async updatePublication(id, param) {
		await API.patch(`/images/${id}.json`, param);
		return this.getPublications();
	}

	static async getCommentsById(id) {
		const res = await API.get(`/images/${id}/comments.json`);
		console.log('test');
		console.log(res);
		return {
			commentsList: res.data,
		}
	}

	static async uploadComment(param) {
		await API.post('/comments', param);
		return this.getCommentsById(param.comment.image_id);
	}
}