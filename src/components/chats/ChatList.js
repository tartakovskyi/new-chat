import React  from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EditBtn from '../common/EditBtn'


const ChatList = ({chats, auth, isAuthData}) => {

	return (
		<tbody>
		{ chats.map((chat, index) => 
			(
				<tr key={index}>
					<td className="align-middle">
						<Link to={'/chat/' + chat.id}>{chat.title}</Link>
					</td>
					<td className="text-center align-middle">
						{chat.messages_count ? <Link to={'/chat/' + chat.id}>{chat.messages_count}</Link> : '0'}
					</td>
					<td>
						{auth && chat.user_id == auth.id && <EditBtn url={'/chat/' + chat.id + '/edit'} />}
					</td>
				</tr>   
			)
		)}
		</tbody>
	)
}


ChatList.propTypes = {
	auth: PropTypes.object,
	isAuthData: PropTypes.bool,
	chats: PropTypes.array
}


const mapStateToProps = function({user}) {

	return {...user} 
}


export default connect(mapStateToProps)(ChatList)
