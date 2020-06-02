import React, { useState } from 'react';
import {
	Avatar, Button, Card, Col, Icon, Row, Popconfirm
} from 'antd/es';
import { useSelector } from 'react-redux';
import PublicationList from '../components/PublicationList';
import PreviewPubs from '../components/PreviewPublication';
import UploadModal from '../components/UploadModal';
import EditModal from '../components/EditPublication';

const Profile = () => {

	const [uploadVisible, setUpload] = useState(false);
	const [previewPubs, setPreviewPubs] = useState({});
	const [previewVisible, setPreviewVisible] = useState(false);
	const [editVisible, setEditVisible] = useState(false);

	const user = useSelector(store => store.authReducers);
	const data = useSelector(store => store.publicationReducers);

	const formatDate = (createdAtDate) => {
		const newDate = new Date(createdAtDate);
		return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
	};

	const deleteAccount = () => {
		console.log('Je supprime mon compte');
	}

	const toggleUpload = () => {
		setUpload(!uploadVisible);
	}

	const openPreview = (pubs) => {
		setPreviewPubs(pubs);
		setPreviewVisible(true);
	}

	return (
		<>
			<UploadModal visible={uploadVisible} toggleModal={toggleUpload} />
			<EditModal visible={editVisible} toggle={() => setEditVisible(false)} data={previewPubs} />
			<PreviewPubs
				previewPubs={previewPubs}
				previewVisible={previewVisible}
				toggle={() => setPreviewVisible(false)}
				isEditable
				editPub={() => setEditVisible(true)} />
			<Row type="flex" align="middle" justify="center">
				<Col sm={16} xs={24}>
					<Card bordered>
						<Row type="flex" align="middle" justify="center">
							<Col md={14} sm={16} xs={24}>
								<Row type="flex" justify="space-between">
									<Col span={10} className="text-center">
										<Avatar size={100} icon="user" className="profil-pic" src={null} />
										<h3>Prenom Nom</h3>
									</Col>
									<Col span={10}>
										<p>
											<Icon type="user" className="p-icon" />
											Username
										</p>
										<p>
											<Icon type="mail" className="p-icon" />
											Email
										</p>
										<p>
											<Icon type="calendar" className="p-icon" />
											{formatDate(user.created_at)}
										</p>
									</Col>
								</Row>
							</Col>
							<Col md={10} sm={16} xs={24} className="text-center">
								<Button type="ghost" icon="setting">Edit account</Button>
								<br />
								<br />
								<Button type="ghost" icon="upload" onClick={() => setUpload(true)}>Upload a picture</Button>
								<br />
								<br />
								<Popconfirm
									title="Are you sure?"
									icon={<Icon type="delete" style={{ color: 'red' }} />}
									onConfirm={() => deleteAccount()}
								>
									<Button type="danger" icon="delete">Delete account</Button>
								</Popconfirm>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
			<Row type="flex" justify="center">
				<Col sm={18} xs={24}>
					<Col span={24} className="container text-center">
						<h2>
							<Icon type="save" />
							<span className="span-icon">Publications</span>
						</h2>
						<PublicationList data={data.publicationList} userId={user.id} openPreview={openPreview} />
					</Col>
				</Col>
			</Row>
		</>
	)
}

export default Profile;