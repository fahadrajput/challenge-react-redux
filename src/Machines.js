import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Progress, Button } from 'antd';
import { useHistory, useParams } from 'react-router-dom'
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
	const [currentMachine, setCurrentMachine] = useState([])
	const history = useHistory()
	const params = useParams()

	useEffect(() => {
		axios.get('http://localhost:8080/machines')
			.then((result) => {
				let { data } = result
				data = data.map((v) => {
					v.key = v.id
					return v
				})
				setData(data)
				setLoading(false)
			})
	})

	if (params.machineId) {
		return (
			<div>
				<h1></h1>
			</div>
		)
	}

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
							history.push(`/machines/${record.id}`)
						}
					};
				}}
			/>
		</div>
	);
}
