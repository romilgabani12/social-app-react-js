import React, { useEffect, useState } from 'react';
import './Register.css';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Typography, Button } from "@mui/material";
import { registerUser } from '../../Actions/User';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Register = () => {

    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.user);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.onload = () => {
            if (Reader.readyState === 2) {// is equal to 2 (which means that the file has been completely loaded),
                setAvatar(Reader.result);
            }
        };

        Reader.readAsDataURL(file);

    }


    const signupHandler = async (e) => {
        e.preventDefault();

        await dispatch(registerUser(name, email, password, avatar));
        

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch , error , alert]);



    return (
        <div className='register'>

            <form className='registerForm' onSubmit={signupHandler}>

                <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>

                <Avatar
                    src={avatar}
                    alt='User'
                    sx={{ height: "10vmax", width: "10vmax" }}
                />

                <input
                    type="file"
                    accept='image/*'
                    onChange={handleImageChange}

                />

                <input
                    className='registerInputs'
                    type="text"
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    className='registerInputs'
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className='registerInputs'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Link to="/">
                    <Typography>Already Signed Up? Login Now</Typography>
                </Link>


                <Button type='submit' disabled={loading}>Sign Up</Button>


            </form>

        </div>
    )
}

export default Register;
