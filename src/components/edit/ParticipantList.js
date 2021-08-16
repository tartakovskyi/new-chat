import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getParticipantsAction } from '../../store/actions/chatAction'
import { deleteFromChat } from '../../api'
import Participant from "./Participant"


const ParticipantList = ({participants, id, getParticipantsAction }) => {

	const deleteParticipant = participantId => {
		deleteFromChat(participantId)
		.then(response => {
			if (response.data.status === 'ok') {
				getParticipantsAction(id)
			}
		}).catch(err => {
			console.log(err)
		})
	}

	return (
		<div className="participants mb-5">
			<h2 className="mb-3">Participants</h2>
			{ participants && participants.length
			? 
			(<div className="d-flex flex-wrap">
				{ participants.map(participant => (<Participant name={participant.user.name} key={participant.id} id={participant.id} deleteParticipant={deleteParticipant} / >)) }	
			</div>)
			: 
			(<p>There are no participants in this chat...</p>) }
		</div>
	)
}


ParticipantList.propTypes = {
	participants: PropTypes.array,
	id: PropTypes.number,
	getParticipantsAction: PropTypes.func.isRequired
}

const mapStateToProps = ({chat}) => {
	return {
		participants : chat.participants
	}
}

export default connect(mapStateToProps, { getParticipantsAction })(ParticipantList)