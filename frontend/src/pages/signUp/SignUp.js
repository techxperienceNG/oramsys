import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../redux/actions/registerAction';
import { toast } from 'react-toastify'


const SignUp = () => {
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const registeredData = useSelector(state => state.registerData.register)
    const [registerData, setRegisterData] = useState({})
    const [registerError, setRegisterError] = useState({})

    useEffect(() => {
        if (registeredData && registeredData.status === 200) {
            toast.success(registeredData.message)
            navigate('/')
        }
    }, [registeredData])


    const handelChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }

    const validation = () => {
        // debugger
        let param = false
        let error = {}
        if (!registerData.name) {
            param = true
            error.name = "Please enter name!"
        }
        if (!registerData.email) {
            param = true
            error.email = "Please enter email!"
        } else {
            if (!emailReg.test(registerData.email)) {
                param = true
                error.email = "Please enter a valid email!"
            }
        }
        if (!registerData.password) {
            param = true
            error.password = "Please enter password!"
        }
        if (!registerData.conformPassword) {
            param = true
            error.conformPassword = "Please enter conform password!"
        } else if (registerData.password !== registerData.conformPassword) {
            param = true
            error.conformPassword = "Please enter same password!"
        }
        setRegisterError(error);
        return param
    }

    const register = (e) => {
        e.preventDefault();
        // debugger
        if (validation()) {
            return
        }
        delete registerData.conformPassword
        dispatch(registerAction(registerData))
    }
    return (
        <section className="login signup">
            <div className="container">
                <div className="sign-grd">
                    <div className="rgt-pan">
                        <h1>Sign In</h1>
                        {/* <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore modi omnis vero a autem harum quidem quo deserunt quos minus
                        </p> */}
                        <a onClick={() => navigate('/')} className="ghost">Sign In</a>
                    </div>
                    <div className="lft-pan">
                        <div className="form-box">
                            <div className='form'>
                                <h1 className='mb-5 mt-5'>Create Account</h1>

                                <input type="text" placeholder="Name" name='name' onChange={(e) => handelChange(e)} />
                                {registerError.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{registerError.name}</span>}
                                <input type="email" placeholder="Email" name='email' onChange={(e) => handelChange(e)} />
                                {registerError.email && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{registerError.email}</span>}
                                <input type="password" placeholder="Password" name='password' onChange={(e) => handelChange(e)} />
                                {registerError.password && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{registerError.password}</span>}
                                <input type="password" placeholder="Conform password" name='conformPassword' onChange={(e) => handelChange(e)} />
                                {registerError.conformPassword && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{registerError.conformPassword}</span>}
                                <button onClick={(e) => register(e)}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp