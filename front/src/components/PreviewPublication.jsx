import React, { useState, useEffect } from 'react';
import {
	Col, List, Modal, Row, message, Comment, Button, Statistic, Icon,
} from 'antd/es';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { deletePubs, uploadComments, getCommentsById } from '../store/actions';
import Loader from './Loader';

const formatDate = (createdAtDate) => {
	const newDate = new Date(createdAtDate);
	return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
};

const Footer = ({ updatePub, deletePub }) => (
	<Row type="flex">
		<Col span={12} className="text-center">
			<Button type="ghost" icon="edit" onClick={updatePub}>Edit</Button>
		</Col>
		<Col span={12} className="text-center">
			<Button type="danger" icon="delete" onClick={deletePub}>Delete</Button>
		</Col>
	</Row>
);

const CommentList = ({ comments, loading }) => (loading) ? <Loader /> : (
	<List
		dataSource={comments}
		header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
		itemLayout="horizontal"
		renderItem={(comment) => (
			<Comment
				author={`User${comment.user_id}`}
				content={comment.content}
				datetime={formatDate(comment.created_at)}
			/>
		)}
	/>
);

const Editor = ({ onChange, onSubmit, value, }) => (
	<Row type="flex" align="middle" justify="space-between" className="stats-container">
		<Col xs={24} md={16}>
			<TextArea rows={1} onChange={onChange} value={value} />
		</Col>
		<Col>
			<Button htmlType="submit" onClick={onSubmit} type="primary">
				Add Comment
		</Button>
		</Col>
	</Row>
);

const PreviewPublication = ({ previewPubs, previewVisible, toggle, isEditable, editPub }) => {

	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const data = useSelector(store => store.commentReducers);

	useEffect(() => {
		dispatch(getCommentsById(previewPubs.id));
	}, [previewPubs, dispatch]);

	const deletePub = () => {
		dispatch(deletePubs(previewPubs.id))
			.then(() => {
				toggle();
				message.success('Publication well deleted', 3);
			});
	}

	const handleSubmitComment = () => {
		if (newComment.length <= 0) return;
		dispatch(uploadComments(previewPubs.id, newComment));
		setNewComment('')
	}

	return (
		<Modal
			width={(previewPubs?.description) ? 520 : 'fit-content'}
			visible={previewVisible}
			footer={isEditable ? <Footer deletePub={deletePub} updatePub={editPub} /> : null}
			onCancel={toggle}
		>
			<Row type="flex" align="middle">
				<Col xs={24} md={(previewPubs?.description) ? 12 : 24} className="text-center">
					<img src={previewPubs.stream || ''} width={200} height={200} alt={previewPubs.description} />
				</Col>
				{(previewPubs?.description) && (
					<Col xs={24} md={12}>
						<div>
							<b>Description:</b>
							<p>{previewPubs?.description}</p>
						</div>
						<div>
							<p>{formatDate(previewPubs.created_at)}</p>
						</div>
					</Col>
				)}
				<Col span={24} className="stats-container">
					<Row type="flex" justify="space-around">
						<Col>
							<Statistic
								title="Likes"
								prefix={(
									<Icon
										type="like"
										theme='outlined'
										className="cursor-pointer"
									/>
								)}
							/>
						</Col>
						<Col>
							<Statistic
								title="Dislikes"
								prefix={(
									<Icon
										type="dislike"
										theme='outlined'
										className="cursor-pointer"
									/>
								)}
								className="cursor-pointer"
							/>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					{data.commentsList.length > 0 && <CommentList comments={data.commentsList} loading={data.loading} />}
					<Editor
						onChange={(e) => setNewComment(e.target.value)}
						onSubmit={handleSubmitComment}
						value={newComment}
					/>
				</Col>
			</Row>
		</Modal>
	)
}

export default PreviewPublication;