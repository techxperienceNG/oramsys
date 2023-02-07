import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAction } from '../../redux/actions/loginAction';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { toast } from 'react-toastify'
import { LOGIN } from '../../redux/types';


const SignIn = () => {
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginData = useSelector(state => state.login.login)

    const [login, setLogin] = useState({})
    const [loginFormError, setLoginFormError] = useState({})

    useEffect(() => {
        if (loginData) {
            console.log('loginData', loginData)
            if (loginData.status === 200 && loginData?.data?.token) {
                // toast.success(loginData.message);
                navigate('/homeLanding')
            } 
        }
    }, [loginData])

    const handelChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const validation = () => {
        let param = false
        let error = {}
        if (!login.email) {
            param = true
            error.email = "Please enter email!"
        } else {
            if (!emailReg.test(login.email)) {
                param = true
                error.email = "Please enter a valid email!"
            }
        }
        if (!login.password) {
            param = true
            error.password = "Please enter password!"
        }
        setLoginFormError(error);
        return param
    }
    const Login = (e) => {
        e.preventDefault();
        if (validation()) {
            return
        }
        let data = {
            user_name: login.email,
            password: login.password
        }
        dispatch(loginAction(data))
    }


    const { authState, oktaAuth } = useOktaAuth();
    const loginWithRedirect = () =>
        oktaAuth.signInWithRedirect({ originalUri: "/" });
    const logOut = () => oktaAuth.signOut();

    const buttonText = authState?.isAuthenticated ? "Logout" : "Login";
    const btnLogic = authState?.isAuthenticated ? logOut : loginWithRedirect;

    
    return (
        <section className="login">
            <div className="container">
                <div className="sign-grd">
                    <div className="lft-pan">
                        <div className="form-box">
                            <div className='form'>
                                <h1 className='mb-5 mt-5'>Sign In</h1>
                                <input type="email" placeholder="Email" name='email' onChange={(e) => handelChange(e)} />
                                {loginFormError.email && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{loginFormError.email}</span>}
                                <input type="password" placeholder="Password" name='password' onChange={(e) => handelChange(e)} />
                                {loginFormError.password && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{loginFormError.password}</span>}
                                <a href="#" className="forgot">Forgot your password?</a>
                                <button onClick={(e) => Login(e)}>Sign In</button>
                            </div>
                        </div>
                    </div>
                    <div className="rgt-pan">
                        <h1>Create Account</h1>
                        {/* <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore modi omnis vero a autem harum quidem quo deserunt quos minus
                        </p> */}
                        <a onClick={() => navigate('/signup')} className="ghost">Create Account</a>
                        <p>OR</p>
                        <a onClick={btnLogic} className="ghost">{buttonText}</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn