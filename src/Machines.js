import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Progress, Input, Button } from 'antd';
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
						<h2 style={{ textAlign: 'center', marginTop: 10 }}>{currentMachine.health}</h2>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div className="progress" style={{ width: '90%', marginBottom: 20 }}>
								<div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '70%' }}>
									<span className="sr-only">70% Complete</span>
								</div>
							</div>
						</div>
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
