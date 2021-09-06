import C from '../constants'
import { getAuthData } from '../../api'


export const logoutAction = () => ({
    type: C.LOGOUT_SUCCESS
})

export const getAuthAction = () => {

	return function(dispatch) {

		return getAuthData().then(response => {
			const auth = response.error ? null : response.data
			dispatch({
				type: C.GET_AUTH,
     			auth: response.data
			})
		})
	}
}
