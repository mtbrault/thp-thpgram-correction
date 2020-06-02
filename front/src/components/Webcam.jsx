import React, { useState } from 'react';
import { Modal } from 'antd/es';
import Webcam from 'react-webcam';

const videoConstraints = {
	width: 720,
	height: 720,
	facingMode: 'user',
};

const WebcamPicture = ({ setPicture, visible, toggleModal }) => {
	const [webcam, setWebcam] = useState(null);

	const setRef = (value) => {
		setWebcam(value);
	};

	const capture = () => {
		if (webcam !== undefined) {
			setPicture(webcam.getScreenshot());
			toggleModal();
		}
	};

	return (
		<Modal
			title="Take picture with webcam"
			okText="Take picture"
			visible={visible}
			onOk={capture}
			onCancel={toggleModal}
			className="modal-webcam"
		>
			<Webcam
				audio={false}
				ref={setRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
				style={{ width: '100%' }}
			/>
		</Modal >
	);
};

export default WebcamPicture;