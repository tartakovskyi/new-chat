import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Axios  from 'axios'
import PropTypes from 'prop-types'
import { getChatInfoAction } from '../../store/actions/chatAction'
import ChatForm from "./ChatForm"
import InviteForm from "./InviteForm"
import ParticipantList from "./ParticipantList"


const EditChatPage = ({ match, chatInfo, getChatInfoAction }) => {

	const id = match.params && match.params.hasOwnProperty('id') ? Number(match.params.id) : null
	const [showParticipants, toggleShowParticipants] = useState(false)

	useEffect(() => {
        if (id) {
        	getChatInfoAction(id)
        	toggleShowParticipants(true)
        }
    }, [id])	

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-9 col-lg-6 col-xl-5">
					<h1 className="text-center">{ id ? 'Edit Chat' : 'Add New Chat' }</h1>
					<ChatForm id={id} chatInfo={chatInfo} />
					{ id && showParticipants && <ParticipantList id={id} /> }
					{ id && <InviteForm chatId={id} /> }
				</div>
			</div>
		</div>
	)
}


EditChatPage.propTypes = {
	chatInfo: PropTypes.object,
	getChatInfoAction: PropTypes.func.isRequired
}


const mapStateToProps = ({chat}) => {
	return { ...chat }
}


export default  connect(mapStateToProps, { getChatInfoAction })(EditChatPage)