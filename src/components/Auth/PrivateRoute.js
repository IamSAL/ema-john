import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from './../../App';

const PrivateRoute = ({ children, ...rest }) => {

    const [AuthInfo, setAuthInfo] = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                AuthInfo.isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/account",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute
