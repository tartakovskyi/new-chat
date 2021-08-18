import axios from "axios"


const token = 'Bearer ' + localStorage.getItem('token')
const apiUrl = 'chat.netxisp.host/api/'


export const checkToken = () => {
    return localStorage.getItem('token') && Date.parse(localStorage.getItem('token_expires')) > Date.now()
}


export const deleteFromChat = participant_id => {
    return axios.delete(apiUrl + 'participant/' + participant_id, {
        headers: {'Authorization' : token}
    })
}


export const getAuthData = () => {
    return axios.get(apiUrl + 'current',{
        headers: {'Authorization' : token}
    })
}


export const searchUser = (searchTerm) => {
    return axios.get(apiUrl + 'user/search/' + searchTerm,{
        headers: {'Authorization' : token}
    })
}
