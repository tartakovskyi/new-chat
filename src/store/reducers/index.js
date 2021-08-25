import { combineReducers } from 'redux'
import user from './user'
import chat from './chat'
import messages from './messages'

export const reducers = combineReducers({
    user,
    chat,
    messages,
})
