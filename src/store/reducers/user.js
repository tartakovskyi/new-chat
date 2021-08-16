import C from '../constants';

const initialState = {isAuthData : false, auth: null};

export default function user(state = initialState, action) {
	switch (action.type) {

		case C.GET_AUTH:
		state = {isAuthData : true, auth: action.auth}
		return state

		case C.LOGOUT_SUCCESS:
		return initialState
		
		default:
		return state
	}
}