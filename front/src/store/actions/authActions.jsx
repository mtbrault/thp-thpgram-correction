import { createActionThunk } from 'redux-thunk-actions';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from '../reducers/authReducers';
import APIManager from '../../services/API';

export const loginUser = createActionThunk(LOGIN_USER, async (email, password) => {
	const param = {
		user: {
			email,
			password,
		}
	};
	const res = await APIManager.loginUser(param);
	return res;
});

export const registerUser = createActionThunk(REGISTER_USER, async (email, password) => {
	const param = {
		user: {
			email,
			password,
			password_confirmation: password,
		}
	};
	const res = await APIManager.registerUser(param);
	return res;
});

export const logoutUser = createActionThunk(LOGOUT_USER, async () => {
	const res = await APIManager.logoutUser();
	return res;
});