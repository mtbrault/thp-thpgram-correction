import React, { useState } from 'react';
import {
	Modal, Row, Col, Upload, message, Avatar, Button
} from 'antd/es';
import { useDispatch } from 'react-redux';
import { uploadPublication } from '../store/actions'
import WebcamPicture from './Webcam';
import InputComponent from './InputComponent';

const UploadModal = ({ visible, toggleModal }) => {

	const [image, setImage] = useState();
	const [description, setDescription] = useState('');
	const [webcamVisible, setWebcamVisible] = useState(false);
	const dispatch = useDispatch();

	const toggleWebcam = () => {
		setWebcamVisible(!webcamVisible);
	}

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'image/jpeg';// || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!', 3);
		}
		const isLt2M = (file.size / 1024 / 1024) < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 50KO!', 3);
		}
		return isJpgOrPng && isLt2M;
	};

	const getBase64 = (file) => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

	const handleChange = async (info) => {
		if (!beforeUpload(info.file)) return;
		const b64 = await getBase64(info.file.originFileObj);

		if (!b64) {
			message.error('Problem while uploading image', 3);
			return;
		}
		info.file.preview = b64;
		setImage(info.file.preview);
	};

	const uploadPicture = () => {
		if (image === '' || description === '')
			return message.error('You must choose a picture and fill a description', 3);
		const data = {
			image: {
				stream: image,
				description,
				private: false,
			}
		}
		dispatch(uploadPublication(data))
			.then(() => {
				toggleModal();
				message.success('Publication well uploaded', 3);
			})
			.catch(err => {
				console.log(err);
			});
	}

	return (
		<Modal
			title="Upload a picture"
			okText="Upload "
			visible={visible}
			onOk={uploadPicture}
			onCancel={toggleModal}
		>
			{webcamVisible && <WebcamPicture setPicture={setImage} visible={webcamVisible} toggleModal={toggleWebcam} />}
			<Row type="flex" align="middle" justify="center">
				<Col span={24} className="text-center">
					<Row type="flex" align="middle" justify="center">
						<Col span={24} className="text-center">
							<Upload
								id="avatar"
								name="avatar"
								listType="picture-card"
								showUploadList={false}
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								onChange={handleChange}
								style={{ width: 0 }}
							>
								{image ? <Avatar src={image} size={100} /> : <Avatar size={100} icon="user" />}
							</Upload>
						</Col>
						<Col span={24} className="text-center">
							<p>or</p>
							<Button onClick={() => toggleWebcam()}>Take with webcam</Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<InputComponent id="description" title="Description" type="text" value={description} onChange={setDescription} />
		</Modal>
	);
}

export default UploadModal