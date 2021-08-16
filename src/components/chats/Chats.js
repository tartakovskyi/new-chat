import React, { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import Axios  from 'axios'
import ChatList  from './ChatList'


const Chats = () => {

	const [chats, setChats] = useState([])

	useEffect(() => {
        axios.get('/api/chat')
		.then((response) => {
			setChats(response.data)
		})
		.catch( (error) => {
			console.log(error)
		})
    }, [])


	return (
		<div className="container">
			<h1>All Chats</h1>
			<div className="d-flex justify-content-end">
				<Link to={'/chat/add'} className="btn btn-primary">Add New Chat</Link>
			</div>
			<table className="table table-striped table-borderless">
				<thead>
					<tr>
						<th>Chat</th>
						<th className="text-center">New Messages</th>
						<th></th>
					</tr>
				</thead>
				<ChatList chats={chats} />
			</table>
		</div>
	)
}


export default Chats