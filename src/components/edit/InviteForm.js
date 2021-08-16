import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { searchUser } from '../../api'
import { addParticipantAction } from '../../store/actions/chatAction'
import SearchResult from "./SearchResult"
import ChosenUser from "./ChosenUser"


const InviteForm = ({ chatId, addParticipantAction }) => {

	const [searchTerm, setSearchTerm] = useState('')
	const [chosenUser, setChosenUser] = useState({})
	const [userIsChosen, setUserIsChosen] = useState(false)
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		if(searchTerm) {
			searchUser(searchTerm)
			.then(response => {
				if (response.data.status === 'ok') {
					setSearchResult(response.data.users)
				}
			})
			.catch(error => console.log(error))
		} else {
			setSearchResult([])
		}
	}, [searchTerm])

	useEffect(() => {
		if(Object.keys(chosenUser).length !== 0) {
			setUserIsChosen(true)
		} else {
			setUserIsChosen(false)
		}
	}, [chosenUser])

	const disabled = userIsChosen ? '' : 'disabled'

	const addParticipant = e => {
		e.preventDefault()

        if (Object.keys(chosenUser).length !== 0) {
        	addParticipantAction(chatId, chosenUser.id)
        	setChosenUser({})
        }
	}

	const chooseUser = (user) => {
		setSearchTerm('')
		setChosenUser(user)
	}

	const onSearchChange = e => setSearchTerm(e.target.value) 


	return (
		<div className="invite-form">
			<h2 className="mb-3">Add New Participants</h2>
			<form onSubmit={addParticipant}>
				{!userIsChosen && (
					<div className="form-group position-relative">
						<input 
						type="text"
						className="form-control"
						autoComplete="off"
						name="searchTerm"
						value={searchTerm} 
						onChange={onSearchChange}
						/>
						{searchResult.length > 0 && <SearchResult users={searchResult} chooseUser={chooseUser} />}
					</div>
				)}
				{userIsChosen && <ChosenUser user={chosenUser} />}				
				<button 
					type="submit"
					className="btn btn-block btn-primary"
					disabled={disabled}
				>
					Add user to the participants
				</button>				
			</form>			
		</div>
	)
}


InviteForm.propTypes = {
	chatId: PropTypes.number.isRequired,
	addParticipantAction: PropTypes.func.isRequired
}


export default  connect(null, { addParticipantAction })(InviteForm)