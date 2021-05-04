import React, { useContext, useEffect, useRef } from 'react'
import './Login.scss';
import LoginForm from './LoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { loginWithFacebook, loginWithGoogle, signOut, signInWithEmailAndPassword, signUpwithEmailPassword } from './AuthProvider';
import { AuthContext } from './../../App';
import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';
import { ShowNotification } from '../Auth/Snackbar';

const Login = () => {

    const location = useLocation();
    const [to, setto] = useState("")

    const [NotifyData, setNotifyData] = useState({ show: false, msg: "Snackbar", severity: "info" })
    const [NotifyShow, setNotifyShow] = useState(false)
    function Notify(msg, severity) {
        setNotifyData(previousData => {
            previousData.msg = msg;
            setNotifyShow(true)
            let id = setTimeout(() => {
                setNotifyShow(false)
            }, 6000)
            while (id--) {
                window.clearTimeout(id);
            }
            previousData.severity = severity;
            return previousData;
        })
    }


    useEffect(() => {


        let togo = location.state?.from?.pathname;
        if (togo) {

            setto(togo)
        }
        return () => {

        }
    }, [location])

    const history = useHistory();
    const [AuthInfo, setAuthInfo] = useContext(AuthContext);
    function setAuth(user, oldto = '/') {
        setAuthInfo(AuthInfo => {
            const newInfo = {
                isLoggedIn: true,
                username: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
            return newInfo;
        })

        history.push(to || oldto)


    }
    const handleSubmit = (values, type) => {
        let { email, password } = values;

        switch (type) {
            case "login":
                signInWithEmailAndPassword(email, password)
                    .then(res => {
                        Notify("Log in successfull", "success")
                        setAuth(res.user)
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                        if (err.code == "auth/user-not-found") {
                            Notify("No account found with this email, signup first.", "error")
                        } else if (err.code = "auth/wrong-password") {
                            Notify("Incorrect password, try again.", "error")
                        } else {
                            Notify("Login Failed,Check details.", "error")
                        }

                    })
                break;
            case "signup":
                signUpwithEmailPassword(email, password)
                    .then(user => {
                        if (user.additionalUserInfo.isNewUser) {
                            Notify("Signup successfull. You can login now...", "success")
                            setTimeout(() => {
                                window.location = '/account#/login'
                            }, 3000)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        if (err.code = "auth/email-already-in-use") {
                            Notify("This email is taken, try with another email.", "error")
                        }

                    })

                break;

            default:
                Notify("Failed with email and password.", "error")
                break;
        }
        // resetForm({})
    }
    function Login(provider) {


        switch (provider) {
            case "google":
                loginWithGoogle()
                    .then(res => {
                        // Notify("Success, You can login now", "success");
                        setAuth(res.user)
                    })
                    .catch(err => {
                        Notify(err.message, "error");
                    })
                break;
            case "fb":
                loginWithFacebook()
                    .then(res => console.log(res.user))
                    .catch(err => {

                        if (err.code == "auth/user-cancelled") {
                            Notify("Failed: You didn't grant permission, try again.", "error");
                        } else if (err.code == "auth/account-exists-with-different-credential") {
                            Notify("Failed: The email associated with your facebook account is already used, Login using that.", "error");
                        } else {
                            Notify("Failed: " + err.code, "error");

                        }

                    })
                break;
            default:
                break;
        }

    }
    return (
        <div>
            <LoginForm handleSubmit={handleSubmit}></LoginForm>
            <div className="oauth">
                <div className="options">
                    <Button variant="contained" onClick={() => { Login('fb') }}><FontAwesomeIcon icon={faFacebook} style={{ marginRight: "10px", color: "#4267B2" }}> </FontAwesomeIcon> Continue with Facebook</Button>
                    <Button variant="contained" onClick={() => { Login('google') }} ><FontAwesomeIcon icon={faGoogle} style={{ marginRight: "10px", color: "#DB4437" }}> </FontAwesomeIcon> Continue with Google</Button>
                </div>


                {NotifyShow && <ShowNotification msg={NotifyData.msg} severity={NotifyData.severity} autohide={6000}></ShowNotification>}


            </div>

        </div>
    )
}

export default Login
