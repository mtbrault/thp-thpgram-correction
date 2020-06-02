import { handleActions } from 'redux-actions';

const initialState = {
	publicationList: [],
	loading: true,
}

export const GET_PUBLICATION = 'GET_PUBLICATION';
export const UPLOAD_PUB = 'UPLOAD_PUB';
export const DELETE_PUB = 'DELETE_PUB';
export const UPDATE_PUB = 'UPDATE_PUB';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions(
	{
		[`${GET_PUBLICATION}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload, loading: false }),
		[`${UPLOAD_PUB}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${DELETE_PUB}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${UPDATE_PUB}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
	},
	initialState
);