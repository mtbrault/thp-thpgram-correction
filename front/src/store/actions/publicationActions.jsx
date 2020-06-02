import { createActionThunk } from 'redux-thunk-actions';
import { UPLOAD_PUB, GET_PUBLICATION, DELETE_PUB, UPDATE_PUB } from '../reducers/publicationReducers';
import APIManager from '../../services/API';

export const uploadPublication = createActionThunk(UPLOAD_PUB, async data => {
	const res = await APIManager.uploadPublication(data);
	return res;
});

export const getPublications = createActionThunk(GET_PUBLICATION, async () => {
	const res = await APIManager.getPublications();
	return res;
});

export const deletePubs = createActionThunk(DELETE_PUB, async id => {
	const res = await APIManager.deletePublication(id);
	return res;
});

export const updatePub = createActionThunk(UPDATE_PUB, async (id, newComment) => {
	const data = {
		image: {
			description: newComment,
		}
	}
	const res = await APIManager.updatePublication(id, data);
	return res;
});