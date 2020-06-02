import React, { useState } from 'react';
import { Modal, message } from 'antd/es';
import { useDispatch } from 'react-redux';
import { updatePub } from '../store/actions';
import InputComponent from './InputComponent';

const EditPublication = ({ data, visible, toggle }) => {
	const [description, setDescription] = useState(data.description);
	const dispatch = useDispatch();

	const update = () => {
		dispatch(updatePub(data.id, description))
			.then(() => {
				data.description = description;
				toggle();
				message.success('Publication well updated', 3);
			});
	}

	return (
		<Modal
			title="Edit publication"
			visible={visible}
			okText="Edit"
			onCancel={toggle}
			onOk={update}
		>
			<InputComponent id="description" title="Description" type="text" value={description} onChange={setDescription} />
		</Modal>
	)
}

export default EditPublication;