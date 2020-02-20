/* eslint-disable quotes */
/* eslint-disable react/display-name */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Icon, notification } from 'antd';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Health from './Components/Health'
import Websocket from 'react-websocket';


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
	const [currentName, setCurrentName] = useState('');
	const [isUpdate, setIsUpdate] = useState(true)
	const [disable, setDisabled] = useState(false)
	const history = useHistory()
	const params = useParams()

	useEffect(() => {
		if (params.machineId) {
			axios.get(`http://localhost:8080/machines/${params.machineId}`)
				.then((res) => {
					setCurrentMachine(res.data)
					setCurrentName(res.data.name)
				})
		}
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
	}, [isUpdate])


	function updateName() {
		setDisabled(true)
		axios.put(`http://localhost:8080/machines/${params.machineId}`, {
			name: currentName
		})
			.then((result) => {
				setCurrentMachine(result.data)
				setDisabled(false)
				setIsUpdate(!isUpdate)
				openNotification("Success", "Successfully Update", "check")
			})
			.catch((e) => {
				setDisabled(false)
				openNotification("Error", "Something Went Wrong", "close-circle", "red")
			})
	}

	function openNotification(title, desc, icon, color = '#108ee9') {
		notification.open({
			message: title,
			description: desc,
			icon: <Icon type={icon} style={{ color: color }} />
		});
	}

	function handleData(v) {
		let result = JSON.parse(v);
		console.log('res', result)
		let updateData = data.map((v) => {
			if (result.id === v.id) {
				v.health = result.health
			}
			return v
		})

		setData(updateData)
	}

	return (
		<div>
			<Websocket url='ws://localhost:1337'
				onMessage={handleData} />
			{params.machineId ? <div style={{ display: 'flex' }}>
				<div style={{ flex: 1 }}>
					<h1>{currentMachine.name}</h1>
					<h2>Update Device</h2>
					<h3 style={{ marginTop: 20 }}>Name:</h3>
					<Input value={currentName} onChange={(e) => setCurrentName(e.target.value)} style={{ width: '80%', marginBottom: 20, display: 'block' }} />
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20%' }}>
						<Button type="primary" onClick={updateName} disabled={disable}>Submit</Button>
					</div>
				</div>
				<div style={{ flex: 1, marginTop: 20 }}>

					<div style={{ width: '80%', borderWidth: 1, borderColor: 'black', borderStyle: 'solid', marginBottom: 20 }}>
						<h2 style={{ textAlign: 'center', marginTop: 10, marginBottom: -5 }}>{currentMachine.health}</h2>
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
								setCurrentName(record.name)
								history.push(`/machines/${record.id}`)
							}
						};
					}}
				/>}
		</div>
	);
}
