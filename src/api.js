import axios from "axios"


const token = 'Bearer ' + localStorage.getItem('token')


export const checkToken = () => {
    return localStorage.getItem('token') && Date.parse(localStorage.getItem('token_expires')) > Date.now()
}


export const deleteFromChat = participant_id => {
    return axios.delete('/api/participant/' + participant_id, {
        headers: {'Authorization' : token}
    })
}


export const getAuthData = () => {
    return axios.get('/api/current',{
        headers: {'Authorization' : token}
    })
}


export const searchUser = (searchTerm) => {
    return axios.get('/api/user/search/' + searchTerm,{
        headers: {'Authorization' : token}
    })
}
