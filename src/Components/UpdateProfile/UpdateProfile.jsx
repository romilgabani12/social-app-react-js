import React, { useEffect, useState } from 'react';
import './UpdateProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Typography, Button } from "@mui/material";
import { useAlert } from 'react-alert';
import { updateProfile } from '../../Actions/User';
import { loadUser } from '../../Actions/User';
import Loader from '../Loader/Loader';

const UpdateProfile = () => {

    const { loading, error, user } = useSelector((state) => state.user);
    const { loading: updateLoading, error: updateError, message } = useSelector((state) => state.like);

    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const alert = useAlert();
    const dispatch = useDispatch();



    const handleImageChange = (e) => {

        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.onload = () => {
            if (Reader.readyState === 2) {// is equal to 2 (which means that the file has been completely loaded),

                setAvatarPrev(Reader.result);

                setAvatar(Reader.result);
            }
        };

        Reader.readAsDataURL(file);

    }


    const submitHandler = async (e) => {
        e.preventDefault();

        await dispatch(updateProfile(name, email, avatar));
        dispatch(loadUser());

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            })
        }

        if (updateError) {
            alert.error(updateError);
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
    }, [dispatch, error, alert, updateError, message]);



    return (
        loading ?
            <Loader /> :
            (
                <div className='updateProfile'>

                    <form className='updateProfileForm' onSubmit={submitHandler}>

                        <Typography variant="h3" style={{ padding: "2vmax" }}>Edit Profile</Typography>

                        <Avatar
                            src={avatarPrev}
                            alt='User'
                            sx={{ height: "10vmax", width: "10vmax" }}
                        />

                        <input
                            type="file"
                            accept='image/*'
                            onChange={handleImageChange}

                        />

                        <input
                            className='updateProfileInputs'
                            type="text"
                            placeholder='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            className='updateProfileInputs'
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />




                        <Button type='submit' disabled={updateLoading}>Update</Button>


                    </form>

                </div>
            )
    )
}




export default UpdateProfile
