import React, { useEffect, useState } from 'react'
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Actions/User';
import { useAlert } from 'react-alert';

const Login = () => {

  const { loading, error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();

    await dispatch(loginUser(email, password));



  }

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch({
        type: "clearErrors"
      })
    }

    if (message) {
      alert.success(message);
      dispatch({
        type: "clearMessage"
      })
    }

  }, [dispatch, error, message, alert])

  return (
    <div className='login'>
      <form className="loginForm" onSubmit={loginHandler}>

        <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>

        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />

        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type='submit' disabled={loading}>Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>

      </form>

    </div>
  )
}

export default Login
