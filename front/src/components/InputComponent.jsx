import React from 'react';
import { Col, Input, Row } from 'antd/es';

const InputComponent = ({
	title, id, type, suffix, value, onChange,
}) => (
		<Row type="flex" justify="center" className="input-container">
			<Col span={20}>
				<b>{title}</b>
				<Input
					id={id}
					type={type}
					suffix={suffix}
					value={value || ''}
					onChange={(e) => onChange(e.target.value)}
				/>
			</Col>
		</Row>
	);

export default InputComponent;
