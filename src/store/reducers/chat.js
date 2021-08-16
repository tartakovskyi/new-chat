import C from '../constants';

const initialState = {
	chatInfo: null,
	participants: null
};

export default function chat (state = initialState, action) {
	switch (action.type) {

		case C.GET_CHAT_INFO:
		return {
			chatInfo: action.chatInfo,
			participants: action.participants
		}

		case C.GET_PARTICIPANTS:
		return {
			...state,
			participants: action.participants
		}
		
		default:
		return state
	}
}