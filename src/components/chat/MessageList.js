import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Message from './Message'


const MessageList = ({messages, isAuthData, auth}) => {

	let lastMessage = sessionStorage.getItem('lastMessage')

	const snd = new Audio("/storage/sounds/new.mp3");

	useEffect(() => {
		if (lastMessage && messages.length && isAuthData) newMesAlert()
		if (messages.length) sessionStorage.setItem('lastMessage', messages[messages.length - 1].id)
    }, [messages])

    const newMesAlert = () => {
    	if (messages[messages.length - 1].id > lastMessage && messages[messages.length - 1].user.id != auth.id) snd.play() 
    }


	return (
		<div className="mb-5">
			{messages.map(message => (
				<Message key={message.id} message={message} className="message rounded mb-4 p-4" />
			))}
		</div>
	)
}


MessageList.propTypes = {
	messages: PropTypes.array
}


const mapStateToProps = ({messages, user}) => {

	return {
		messages: messages.list, 
		...user
	}
}

export default connect(mapStateToProps)(MessageList)
