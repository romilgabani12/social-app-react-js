import React, { useEffect, useState } from 'react';
import './ForgotPassword.css';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from '../../Actions/User';
import { useAlert } from 'react-alert';


const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, message } = useSelector((state) => state.like);

    const submitHandler = async (e) => {

        e.preventDefault();

        await dispatch(forgotPassword(email));

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({
                type: "clearErrors",
            })
        }

        if (message) {
            alert.success(message);
            dispatch({
                type: "clearMessage"
            })
        }
    })

    return (
        <div className='forgotPassword'>
            <form className="forgotPasswordForm" onSubmit={submitHandler}>

                <Typography variant="h3" style={{ padding: "2vmax" }}>Forgot Password</Typography>

                <input
                    className='forgotPasswordInputs'
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required

                />


                <Button type='submit' disabled={loading}>Send Token</Button>


            </form>

        </div>
    )
}

export default ForgotPassword;
