import React, { useState, useEffect } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getAuthAction, logoutAction } from '../store/actions/userAction'
import { checkToken } from '../api'
import Navigation from './common/Navigation'
import Chat from './chat/Chat'
import Chats from './chats/Chats'
import EditChatPage from './edit/EditChatPage'
import Login from './auth/Login'
import Register from './auth/Register'

const axios = require('axios').default
axios.defaults.baseURL = 'http://chat.netxisp.host/api/'

const App = ({ isAuthData, getAuthAction, logoutAction }) => {
    const [isLogged, setIsLogged] = useState(Boolean(checkToken()))
    const [isAuthRequest, setIsAuthRequest] = useState(false)

    useEffect(() => {
        if (isAuthData !== true) {
            getAuthAction().finally(() => setIsAuthRequest(true))
        }
    }, [isAuthData, isLogged])

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('token_expires')
        logoutAction()
    }

    return (
        <div>
            <Navigation logout={logout} />
            <main>
                {isAuthRequest && (
                    <>
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login {...props} setIsLogged={setIsLogged} />
                            )}
                        />
                        <Route path="/register" component={Register} />
                        {!isAuthData && <Redirect to="/login" />}
                        <Route exact path="/" component={Chats} />
                        <Switch>
                            <Route path="/chat/add" component={EditChatPage} />
                            <Route exact path="/chat/:id" component={Chat} />
                        </Switch>
                        <Route path="/chat/:id/edit" component={EditChatPage} />
                    </>
                )}
            </main>
        </div>
    )
}

App.propTypes = {
    isAuthData: PropTypes.bool,
}

const mapStateToProps = function ({ user }) {
    return {
        isAuthData: user.isAuthData,
    }
}

export default connect(mapStateToProps, { getAuthAction, logoutAction })(App)
