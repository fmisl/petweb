import React,{useState, useEffect} from 'react';
import '../../App.css'
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {login} from '../../actions';
import useForm from "./useForm"
import validate from "./validate"

function Login() {
  const dispatch = useDispatch();
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { username: "", password: "" },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
      fetchItems()
    },
    validate,
  })
  const fetchItems = async () => {
    const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="login-form">
      <div>SIGN IN</div>
      <label>
        USERNAME
        <input
          type="username"
          name="username"
          value={values.username}
          onChange={handleChange}
          // className={errors.email && "errorInput"}
          className={"input-id"}
        />
        {errors.username && <span className="errorMessage">{errors.username}</span>}
      </label>
      <label>
        PASSWORD
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          // className={errors.email && "errorInput"}
          className={"input-pw"}
        />
        {errors.password && ( <span className="errorMessage">{errors.password}</span>)}
      </label>
      <button type="submit" disabled={submitting} className={"login-link"}>Login</button>
      {/* <button type="submit" disabled={submitting} onClick={()=> dispatch(login())} className={"login-link"}>Login</button> */}
    </form>
  );
}

export default Login;
