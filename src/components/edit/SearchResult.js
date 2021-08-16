import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const SearchResult = ({ users, chooseUser, participants }) => {

	const filteredUsers = users.filter(user => {
		return participants.findIndex(
			participant => participant.user_id == user.id
		) == -1
	})

	const onUserClick = user => {
		chooseUser(user)
	}
		
	return (
		<div className="search-result position-absolute d-flex flex-column">
			<ul>
				{filteredUsers.map(user => 
					(<li key={user.id} onClick={() => onUserClick(user)}>{user.name}</li>)
				)}
			</ul>
		</div>
	)
}


SearchResult.propTypes = {
	users: PropTypes.array.isRequired,
	participants: PropTypes.array,
	chooseUser: PropTypes.func.isRequired
}


const mapStateToProps = ({chat}) => {
	return {
		participants : chat.participants
	}
}

export default connect(mapStateToProps)(SearchResult)
