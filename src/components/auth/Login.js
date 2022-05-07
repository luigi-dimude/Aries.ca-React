import React, { useState } from 'react'
import Navbar from '../layout/Navbar'
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

     // Initialize useNavigate
    let navigate = useNavigate();

    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const [errorAlert, setErrorAlert] = useState('')


    const {email, password } = login;
    
    const handleChange = e => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const loginUser = async(e) => {
        e.preventDefault();

       try {
        const res = await Axios.post(`https://jobs-api-arie.herokuapp.com/api/v1/auth/login`, {
            email,
            password
        });

        console.log(res)
        if (res.data.token) {

            localStorage.setItem("jobs-aries-token", res.data.token)
            localStorage.setItem("jobs-aries-username", res.data.user.name)
            
            navigate("/userJobs");
        }
        else {
            navigate("/");
        }


       }
       catch(err) {
           setErrorAlert(err.response.data.msg)
           // TODO catch errors based on status codes and send error messages

       }


    }


  return (
    <>
    <Navbar/>
        <div className='login__container'>
        <div className="login__card">
            <div className="errorAlert">
                {errorAlert ? <div><span>{errorAlert}</span> <br /> <br /> </div>  : null }
            </div>
            <form className='form__container'>
                <div className="form-group">
                    <label>Email : </label>
                    <input className="form-text" name='email' value={email} onChange={handleChange} type="text" required />
                </div>
                <div className="form-group">
                    <label>Password : </label>
                    <input className="form-text" name='password' value={password} onChange={handleChange} type="password" required />
                </div>

                <div className="auth__button-container">
                    <button className="auth__button" onClick={loginUser}>Log in</button> 
                    <Link className="auth__button" to="/userJobs">Back</Link>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login