import React, { useEffect, useState } from 'react';
import './NewPost.css';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../Actions/Post';
import { useAlert } from 'react-alert';
import { loadUser } from '../../Actions/User';

const NewPost = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    const alert = useAlert();

    const { loading, error, message } = useSelector((state) => state.like);
    const dispatch = useDispatch();

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.onload = () => {
            if (Reader.readyState === 2) {// is equal to 2 (which means that the file has been completely loaded),
                setImage(Reader.result);
            }
        };

        Reader.readAsDataURL(file);

    }

    const submitHandler = async (e) => {

        e.preventDefault();
        await dispatch(createNewPost(caption, image));

        dispatch(loadUser());

        setImage(null);
        setCaption("");

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
    }, [dispatch, error, message, alert]);

    return (
        <div className='newPost'>

            <form className='newPostForm' onSubmit={submitHandler}>

                <Typography variant='h3'>New Post</Typography>

                {image && <img src={image} alt='post' />}
                <input
                    type="file"
                    accept='image/*'
                    onChange={handleImageChange}
                />

                <input
                    type="text"
                    placeholder='Caption...'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />

                <Button type='submit' disabled={loading}>Post</Button>  {/* if loading is true -- button is disabled */}

            </form>

        </div>
    )
}

export default NewPost
