import { handleActions } from 'redux-actions';

const initialState = {
	commentsList: [],
	loading: true,
}

export const GET_COMMENTS = 'GET_COMMENTS';
export const UPLOAD_COMMENTS = 'UPLOAD_COMMENTS';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions(
	{
		[`${GET_COMMENTS}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload, loading: false }),
		[`${UPLOAD_COMMENTS}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload, loading: false }),
	},
	initialState
);