import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from '@mui/material';
import { resetPassword } from '../../Actions/User';
import { Link, useParams } from 'react-router-dom';

const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, message, loading } = useSelector((state) => state.like);

    const params = useParams();

    const resetPasswordHandler = async (e) => {

        e.preventDefault();

        await dispatch(resetPassword(params.token, newPassword));

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            });
        }

        if (message) {
            alert.success(message);
            dispatch({
                type: "clearMessage"
            });
        }
    })

    return (
        <div className='resetPassword'>
            <form className="resetPasswordForm" onSubmit={resetPasswordHandler}>

                <Typography variant="h3" style={{ padding: "2vmax" }}>Reset Password</Typography>

                <input
                    className='resetPasswordInputs'
                    type="password"
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required

                />


                <Link to="/">
                    <Typography>Login</Typography>
                </Link>

                <Typography>Or</Typography>

                <Link to="/forgot/password">
                    <Typography>Request Another Token!</Typography>
                </Link>



                <Button type='submit' disabled={loading}>Reset Password</Button>


            </form>

        </div>
    )
}

export default ResetPassword
