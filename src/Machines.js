import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Progress, Input, Button } from 'antd';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Health from './Components/Health'


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
			<Health health={v} />
		</div>
	}
];


export default function Machines() {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])
	const [currentMachine, setCurrentMachine] = useState({})
	const [isUpdate, setIsUpdate] = useState(true)
	const history = useHistory()
	const params = useParams()

	useEffect(() => {
		if (params.machineId) {
			axios.get(`http://localhost:8080/machines/${params.machineId}`)
				.then((res) => {
					setCurrentMachine(res.data)
					console.log('res')
					// handleUpdate(res.data)
				})
		}
		else {
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
		}
	}, [isUpdate])

	return (
		<div>
			{params.machineId ? <div style={{ display: 'flex' }}>
				<div style={{ flex: 1 }}>
					<h1>{currentMachine.name}</h1>
					<h2>Update Device</h2>
					<h3>Name:</h3>
					<Input value={currentMachine.name} style={{ width: '80%', marginBottom: 20, display: 'block' }} />
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20%' }}>
						<Button type="primary">Submit</Button>
					</div>
				</div>
				<div style={{ flex: 1, marginTop: 20 }}>

					<div style={{ width: '80%', borderWidth: 1, borderColor: 'black', borderStyle: 'solid', marginBottom: 20 }}>
						<Health health={currentMachine.health} />
					</div>
					<h1>Stats</h1>
					<h4>IP Address: {currentMachine.ip_address}</h4>
				</div>
			</div> : <Table
					columns={columns}
					dataSource={data}
					size="middle"
					pagination={false}
					loading={loading}
					onRow={(record, rowIndex) => {
						return {
							onClick: () => {
								setCurrentMachine(record)
								history.push(`/machines/${record.id}`)
							}
						};
					}}
				/>}
		</div>
	);
}
