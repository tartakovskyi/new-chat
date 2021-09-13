import React, { useState, useEffect } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getAuthAction, logoutAction } from '../store/actions/userAction'
import Navigation from './common/Navigation'
import Chat from './chat/Chat'
import Chats from './chats/Chats'
import EditChatPage from './edit/EditChatPage'
import Login from './auth/Login'
import Register from './auth/Register'

const App = ({ auth, getAuthAction, logoutAction }) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isAuthRequest, setIsAuthRequest] = useState(false)

    useEffect(() => {
        if (auth !== true) {
            getAuthAction().finally(() => setIsAuthRequest(true))
        }
    }, [isLogged])

    const logout = () => {
        localStorage.removeItem('token')
        logoutAction()
        setIsLogged(false)
    }

    return (
        <div>
            {isAuthRequest && (
                <>
                    <Navigation logout={logout} />
                    <main>
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login {...props} setIsLogged={setIsLogged} />
                            )}
                        />
                        <Route path="/register" component={Register} />
                        {!auth && <Redirect to="/login" />}
                        <Route exact path="/" component={Chats} />
                        <Switch>
                            <Route path="/chat/add" component={EditChatPage} />
                            <Route exact path="/chat/:id" component={Chat} />
                        </Switch>
                        <Route path="/chat/:id/edit" component={EditChatPage} />
                    </main>
                </>
            )}
        </div>
    )
}

App.propTypes = {
    auth: PropTypes.bool,
}

const mapStateToProps = function ({ user }) {
    return {
        auth: user.auth,
    }
}

export default connect(mapStateToProps, { getAuthAction, logoutAction })(App)
