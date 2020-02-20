import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Progress, Button } from 'antd';
import axios from 'axios';


const columns = [
	{
		title: 'Name',
		dataIndex: 'name'
	},
	{
		title: 'IP Address',
		dataIndex: 'ip_address'
	},
	{
		title: 'Health',
		dataIndex: 'health',
		render: (v) => <div>
			<Progress percent={v} strokeWidth={15} size="small" />
		</div>
	}
];


export default function Machines() {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		axios.get('http://localhost:8080/machines')
			.then((result) => {
				const { data } = result
				setData(data)
				setLoading(false)
			})
	})

	return (
		<div>
			<div>Machines view</div>
			<Table
				columns={columns}
				dataSource={data}
				size="middle"
				pagination={false}
				loading={loading}
				onRow={(record, rowIndex) => {
					return {
						onClick: () => {
							console.log(record.id)
						}
					};
				}}
			/>
		</div>
	);
}
