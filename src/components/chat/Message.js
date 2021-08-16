import React from 'react'
import PropTypes from 'prop-types'


const Message = ({message}) => {

	const convertDate = date => {
		const newDate = Date.parse(date)

		return new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"}).format(newDate)
	}

	return (
		<div className="message rounded mb-4 p-4">
			<div className="d-flex justify-content-between mb-3">
				<b>{message.user.name}</b>
				<b>{convertDate(message.created_at)}</b>
			</div>
			<p>{message.text}</p>
		</div> 
	)
}


Message.propTypes  = {
	message: PropTypes.object
}


export default Message
