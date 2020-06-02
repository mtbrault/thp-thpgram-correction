import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Col, Row,
} from 'antd/es';
import { getPublications } from '../store/actions';
import PreviewPubs from '../components/PreviewPublication';
import Loader from '../components/Loader';
import PublicationList from '../components/PublicationList';

const Home = () => {

	const data = useSelector((store) => store.publicationReducers);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewPubs, setPreviewPubs] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPublications())
	}, [dispatch]);

	const openPreview = item => {
		setPreviewPubs(item);
		setPreviewVisible(true);
	}

	if (data.loading) {
		return (
			<Loader />
		)
	}

	return (
		<Row type="flex" align="middle" justify="center">

			{previewPubs && <PreviewPubs
				previewPubs={previewPubs}
				previewVisible={previewVisible}
				toggle={() => setPreviewVisible(!previewVisible)}
				isEditable={false}
			/>}
			<Col sm={18} xs={24}>
				<PublicationList data={data.publicationList} openPreview={openPreview} />
			</Col>
		</Row>
	)
}

export default Home;