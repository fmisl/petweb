import React,{useState, useEffect} from 'react';
import '../../App.css'
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {login,profile} from '../../reduxs/actions';
import useForm from "./useForm"
import validateLogin from "./validateLogin"
import * as services from '../../services/fetchApi'

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      let res = null
      try{
        res = await services.Login(values)
        console.log(res)
        const token = res.data.token
        console.log(token)
        // alert("Login success.")
        localStorage.setItem('token', token)
        localStorage.setItem('username', values.username)
        dispatch(login())
        // dispatch(profile(values.username))
      } catch (e){
        console.log(e.response.data.non_field_errors)
        alert(e.response.data.non_field_errors)
      } finally{
        console.log(res)
      }
    },
    validate: validateLogin,
  })

  return (
    <form onSubmit={handleSubmit} noValidate className="login-form">
      <div onClick={()=>history.push('/signup')} className="signup-link">SIGN UP</div>
      <div className="login-title">SIGN IN</div>
      <label>
        USERNAME
        <input
          type="username"
          name="username"
          placeholder="username"
          value={values.username}
          onChange={handleChange}
          // className={errors.email && "errorInput"}
          // className={"login-input"}
        />
        {errors.username && <span className="errorMessage">{errors.username}</span>}
      </label>
      <label>
        PASSWORD
        <input
          type="password"
          name="password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
          // className={errors.email && "errorInput"}
          // className={"input-pw"}
        />
        {errors.password && ( <span className="errorMessage">{errors.password}</span>)}
      </label>
      <button type="submit" disabled={submitting} className={"login-btn"}>Login</button>
      <span onClick={()=>history.push('/forgot')} className="forgot">Forgot password?</span>
      {/* <button type="submit" disabled={submitting} onClick={()=> dispatch(login())} className={"login-link"}>Login</button> */}
    </form>
  );
}

export default Login;
