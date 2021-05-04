import { Formik, ErrorMessage, Form, Field } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { HashRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import { signInWithEmailAndPassword } from './AuthProvider';

const LoginForm = ({ handleSubmit }) => {

    const loginSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Password needs to be atleast 8 characters long.")
            .max(256, "Too long!")
            .required("Password can't be empty"),
        email: Yup.string().email("Invalid email").required("Required"),

    })
    const signupSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Password needs to be atleast 8 characters long.")
            .max(256, "Too long!")
            .required("Password can't be empty"),
        email: Yup.string().email("Invalid email").required("Required"),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    return (
        <div className="loginForm">

            <HashRouter>
                <Switch>
                    <Route path="/login">
                        <Formik validationSchema={loginSchema} validateOnChange={true} validateOnBlur={false} initialValues={{
                            password: '',
                            email: '',
                        }}
                            onSubmit={(values => { handleSubmit(values, "login") })}>
                            <Form method="POST" >
                                <label htmlFor="email">email:</label>
                                <Field name="email" type="email" id="email" placeholder="email"></Field>
                                <ErrorMessage className="formerror" name="email" component="div"></ErrorMessage>
                                <label htmlFor="password" >Password</label>

                                <Field name="password" type="password" id="password" placeholder="password"></Field>
                                <ErrorMessage className="formerror" name="password" component="div"></ErrorMessage>
                                <button type="Submit">Login</button>
                                <div>Not account? <Link to="/signup">Signup now</Link></div>
                            </Form>

                        </Formik>
                    </Route>
                    <Route path="/signup" >
                        <Formik validationSchema={signupSchema} validateOnChange={true} validateOnBlur={false} initialValues={{
                            password: '',
                            confirmpassword: '',
                            name: '',
                            email: '',
                        }}
                            onSubmit={(values => { handleSubmit(values, "signup") })}>
                            <Form method="POST" >
                                <label htmlFor="name">Full Name:</label>
                                <Field name="name" id="name" placeholder="name"></Field>
                                <ErrorMessage className="formerror" name="name" component="div"></ErrorMessage>
                                <label htmlFor="email">email:</label>
                                <Field name="email" type="email" id="email" placeholder="email"></Field>
                                <ErrorMessage className="formerror" name="email" component="div"></ErrorMessage>
                                <label htmlFor="dob">Date of birth:</label>
                                <Field name="dob" type="date" id="dob" placeholder="dob"></Field>
                                <ErrorMessage className="formerror" name="dob" component="div"></ErrorMessage>
                                <label htmlFor="password" >Password</label>
                                <Field name="password" type="password" id="password" placeholder="password"></Field>
                                <ErrorMessage className="formerror" name="password" component="div"></ErrorMessage>
                                <label htmlFor="confirmpassword" >Confirm password</label>
                                <Field name="confirmpassword" type="confirmpassword" id="confirmpassword" placeholder="confirm password"></Field>
                                <ErrorMessage className="formerror" name="confirmpassword" component="div"></ErrorMessage>
                                <button type="Submit">Create Account</button>
                                <div>Already signed up? <Link to="/login">Login now</Link></div>
                            </Form>

                        </Formik>
                    </Route>


                    <Route path="*" exact>
                        <Redirect to="/login"></Redirect>
                    </Route>
                </Switch>
            </HashRouter>


        </div>
    )
}

export default LoginForm
