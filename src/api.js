import axios from 'axios'

const localToken = localStorage.getItem('token')
const token = 'Bearer ' + localToken
axios.defaults.baseURL = 'http://chat.netxisp.host/api/'

export const checkToken = () => {
    return (
        localStorage.getItem('token') &&
        Date.parse(localStorage.getItem('token_expires')) > Date.now()
    )
}

export const deleteFromChat = (participant_id) => {
    return axios.delete('/participant/' + participant_id, {
        headers: { Authorization: token },
    })
}

export const getAuthData = () => {
    const authToken = localToken
        ? token
        : 'Bearer ' + localStorage.getItem('token')
    return axios.get('/current', {
        headers: { Authorization: authToken },
    })
}

export const searchUser = (searchTerm) => {
    return axios.get('/user/search/' + searchTerm, {
        headers: { Authorization: token },
    })
}
