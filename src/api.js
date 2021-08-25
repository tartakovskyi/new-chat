import axios from 'axios'

const token = 'Bearer ' + localStorage.getItem('token')
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
    return axios.get('/current', {
        headers: { Authorization: token },
    })
}

export const searchUser = (searchTerm) => {
    return axios.get('/user/search/' + searchTerm, {
        headers: { Authorization: token },
    })
}
