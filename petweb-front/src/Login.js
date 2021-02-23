import React,{useState} from 'react';
import './App.css'
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import {login} from './actions';

function Login() {
  const [values, setValues] = useState({ email: "", password: "" })
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
    console.log([name],":", value )
  }

  const handleSubmit = async (event) => {
    // setSubmitting(true)
    // event.preventDefault()
    // await new Promise((r) => setTimeout(r, 1000))
    // setErrors(validate(values))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="login-form">
        <div>SIGN IN</div>
        <label>
          USERNAME
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            // className={errors.email && "errorInput"}
          />
          {/* {errors.email && <span className="errorMessage">{errors.email}</span>} */}
        </label>
        <label>
          PASSWORD
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            // className={errors.email && "errorInput"}
          />
          {/* {errors.password && ( <span className="errorMessage">{errors.password}</span>)} */}
        </label>
        <Link onClick={()=> dispatch(login())} className={"login-link"}><li>Login</li></Link>
      </div>
    </form>
  );
}

export default Login;
