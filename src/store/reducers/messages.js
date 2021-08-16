import C from '../constants';

const initialState = {list: [], lastMessage: null};

export default function messages (state = initialState, action) {
	switch (action.type) {

		case C.GET_MESSAGES:
		const list = [...state.list, ...action.messages]
		return {
			...state,
			list
		}
		
		default:
		return state
	}
}