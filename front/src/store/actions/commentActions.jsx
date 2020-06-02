import { createActionThunk } from 'redux-thunk-actions';
import { GET_COMMENTS, UPLOAD_COMMENTS } from '../reducers/commentReducers';
import APIManager from '../../services/API';

export const getCommentsById = createActionThunk(GET_COMMENTS, async id => {
	const res = await APIManager.getCommentsById(id);
	return res;
});

export const uploadComments = createActionThunk(UPLOAD_COMMENTS, async (imageId, content) => {
	const data = {
		comment: {
			content,
			image_id: imageId,
		}
	}
	const res = await APIManager.uploadComment(data);
	return res;
});