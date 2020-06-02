import { handleActions } from 'redux-actions';

const initialState = {
	token: '',
	error: '',
}

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const SUCCEEDED = 'SUCCEEDED';
const FAILED = 'FAILED';

export default handleActions(
	{
		[`${LOGIN_USER}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload, error: '' }),
		[`${LOGIN_USER}_${FAILED}`]: (state) => ({ ...state, error: 'Connexion failed' }),
		[`${REGISTER_USER}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload, error: '' }),
		[`${REGISTER_USER}_${FAILED}`]: (state) => ({ ...state, error: 'Connexion failed' }),
		[`${LOGOUT_USER}_${SUCCEEDED}`]: () => (initialState),
	},
	initialState
);