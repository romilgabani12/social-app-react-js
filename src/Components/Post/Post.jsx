import { Avatar, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./Post.css";
import { Link } from 'react-router-dom';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, likePost, updateCaptionPost, deletePost } from '../../Actions/Post';
import { getFollowingPosts, getMyPosts, getUserPosts, loadUser } from '../../Actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';
import { useParams } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';


const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
    // homeAllSignupUserProfile = "homeAllSignupUserProfile",
}) => {

    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);

    const [showPicker, setShowPicker] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);

    const [captionValue, setCaptionValue] = useState(caption);
    const [captionToggle, setCaptionToggle] = useState(false);
    const params = useParams();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);




    const handleLike = async () => {
        setLiked(!liked);

        await dispatch(likePost(postId));
        dispatch(getUserPosts(params.id));

        if (isAccount) {
            dispatch(getMyPosts());
        } else {
            dispatch(getFollowingPosts());
        }

        // if (homeAllSignupUserProfile === "homeAllSignupUserProfile") {
        //     dispatch(getUserPosts(params.id))
        // } else if (isAccount) {
        //     dispatch(getMyPosts())
        // } else {
        //     dispatch(getFollowingPosts())
        // }

    };

    // page referesh tai tyare post likes hase to like rese otherwise unliked rese 
    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true);
            }
        })
    }, [likes, user._id]);



    const addCommentHandler = async (e) => {
        e.preventDefault();

        await dispatch(addCommentOnPost(postId, commentValue));
        dispatch(getUserPosts(params.id));

        if (isAccount) {
            dispatch(getMyPosts());
        } else {
            dispatch(getFollowingPosts());
        }

        // if (homeAllSignupUserProfile === "homeAllSignupUserProfile") {
        //     dispatch(getUserPosts(params.id))
        // } else if (isAccount) {
        //     dispatch(getMyPosts())
        // } else {
        //     dispatch(getFollowingPosts())
        // }

    }


    const updateCaptionHandler = (e) => {
        e.preventDefault();

        dispatch(updateCaptionPost(captionValue, postId));
        dispatch(getMyPosts());
    }

    const deletePostHandler = async () => {

        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser());
    }


    const onEmojiClick = (event) => {

        setCommentValue((prevInput) => prevInput + event.emoji);
        setShowPicker(false);
    };



    return (
        <div className='post'>
            <div className="postHeader">

                {
                    isAccount ?
                        <Button onClick={() => setCaptionToggle(!captionToggle)}>
                            <MoreVert />
                        </Button> :
                        null
                }
            </div>

            <img src={postImage} alt="Post" />

            <div className="postDetails">

                <Avatar
                    src={ownerImage}
                    alt='User'
                    sx={{
                        height: "3vmax",
                        width: "3vmax",
                    }}
                />

                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>


                <Typography
                    fontWeight={100}
                    color="rgba(0,0,0,0.582)"
                    style={{ alignSelf: "center" }}
                >
                    {caption}
                </Typography>
            </div>


            <button style={{
                border: "none",
                backgroundColor: "white",
                cursor: "pointer",
                margin: "1vmax 2vmax",
            }}
                onClick={() => setLikesUser(!likesUser)}
                disabled={likes.length === 0 ? true : false}
            >
                <Typography>{likes.length} Likes</Typography>
            </button>


            <div className="postFooter">

                <Button onClick={handleLike}>
                    {
                        liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />
                    }
                </Button>

                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <Typography className='comment-value'>{comments.length}</Typography>
                    <ChatBubbleOutline />
                </Button>

                {
                    isDelete ? <Button onClick={deletePostHandler}>
                        <DeleteOutline />
                    </Button> : null
                }


            </div>



            {/* Likes DialogBox */}
            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>

                <div className="DialogBox">

                    <Typography variant='h4'>Liked By</Typography>

                    {
                        likes.map((like) => (
                            <User
                                key={like._id}
                                userId={like._id}
                                name={like.name}
                                avatar={like.avatar.url}
                            />
                        ))
                    }
                </div>

            </Dialog>



            {/* comment DialogBox */}
            <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>

                <div className="DialogBox">

                    <Typography variant='h4'>Comments</Typography>

                    <form className="commentForm" onSubmit={addCommentHandler}>

                        <span onClick={() => setShowPicker(val => !val)} className='emojiSpan'><EmojiEmotionsOutlinedIcon /></span>
                        <input
                            type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder='Comment Here...'
                            required

                        />

                        <div className={`emojiPickerContainer ${showPicker ? 'open-above' : ''}`}>

                            {showPicker && <Picker onEmojiClick={onEmojiClick} />}
                            
                        </div>
                        <Button type='submit' variant='contained'>Add</Button>
                    </form>

                    {
                        comments.length > 0 ?
                            comments.map((item) => (
                                <CommentCard
                                    key={item._id}
                                    userId={item.user._id}
                                    name={item.user.name}
                                    avatar={item.user.avatar.url}
                                    comment={item.comment}
                                    commentId={item._id}
                                    postId={postId}
                                    isAccount={isAccount}

                                />
                            )) :
                            <Typography>No comments yet</Typography>
                    }

                </div>

            </Dialog>



            {/* update Caption on Post DialogBox */}
            <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>

                <div className="DialogBox">

                    <Typography variant='h4'>Update Caption</Typography>

                    <form className="commentForm" onSubmit={updateCaptionHandler}>
                        <input
                            type="text"
                            value={captionValue}
                            onChange={(e) => setCaptionValue(e.target.value)}
                            placeholder='Caption Here...'
                            required
                        />

                        <Button type='submit' variant='contained'>Update</Button>
                    </form>

                </div>

            </Dialog>





        </div>
    )
}

export default Post
