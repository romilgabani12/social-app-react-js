import React, { useEffect, useState } from 'react';
import './Search.css';
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import User from '../User/User';

const Search = () => {

    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const { users, loading } = useSelector((state) => state.allUsers);

    const searchHandler = async (e) => {
        e.preventDefault();

        await dispatch(getAllUsers(name));


    }

    useEffect(() => {
        dispatch(getAllUsers(name));
    }, [dispatch, name])

    return (
        <div className='search'>


            <form className='searchForm' onSubmit={searchHandler}>

                <Typography variant="h3" style={{ padding: "2vmax" }}>Search Users</Typography>

                <input
                    type="text"
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />


                <Button type='submit' disabled={loading}>Search</Button>


                <div className="searchResults">

                    {
                        users && users.map((user) => (
                            <User
                                key={user._id}
                                userId={user._id}
                                name={user.name}
                                avatar={user.avatar.url}
                            />
                        ))

                    }

                </div>


            </form>




        </div>
    )
}

export default Search
