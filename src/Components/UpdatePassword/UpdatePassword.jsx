import React, { useState, useEffect } from 'react'
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";

import { useDispatch, useSelector } from 'react-redux'

import { useAlert } from 'react-alert';
import { changePassword } from '../../Actions/User';


const UpdatePassword = () => {

    const { loading, error, message } = useSelector((state) => state.like);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const UpdatePasswordHandler = async (e) => {
        e.preventDefault();

        await dispatch(changePassword(oldPassword, newPassword));
        setOldPassword("");
        setNewPassword("");

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
    }, [dispatch, error, alert, message]);



    return (
        <div className='updatePassword'>
            <form className="updatePasswordForm" onSubmit={UpdatePasswordHandler}>

                <Typography variant="h3" style={{ padding: "2vmax" }}>Change Password</Typography>


                <input
                    className='updatePasswordInputs'
                    type="password"
                    placeholder='Old Password'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required

                />

                <input
                    className='updatePasswordInputs'
                    type="password"
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required

                />



                <Button type='submit' disabled={loading}>Change Password</Button>


            </form>

        </div>
    )
}

export default UpdatePassword
