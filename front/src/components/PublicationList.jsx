import React from 'react';
import { Button, Card, List, Tag } from 'antd/es';

const PublicationList = ({ data, userId, openPreview }) => {

	const list = (!userId) ? data : data.filter(pub => pub.user_id === userId);

	return (
		<List
			header={(
				<h3 className="title-h1">
					List of publications&nbsp;
					<Tag>{list.length}</Tag>
				</h3>
			)}
			grid={{
				gutter: 8, column: 4, xs: 1, sm: 2, md: 2, lg: 3, xl: 4,
			}}
			dataSource={list}
			renderItem={(post) => (
				<List.Item>
					<Card
						bordered
						title={
							<Button type="link" icon="user" >{`User${post.user_id}`}</Button>
						}
						className="card-pubs"
					>
						<img onClick={() => openPreview(post)} src={post.stream} width={200} height={200} alt="" />
					</Card>
				</List.Item>
			)}
		/>
	)
}

export default PublicationList;