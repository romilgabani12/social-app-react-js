import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollowUser, getUserPosts, getUserProfile, loadUser } from '../../Actions/User';
import Loader from "../Loader/Loader";
import { useAlert } from 'react-alert';
import Post from '../Post/Post';
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import User from '../User/User';
import { useParams } from 'react-router-dom';


const UserProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user, loading: userLoading, error: userError } = useSelector((state) => state.userProfile);

    const { user: me } = useSelector((state) => state.user);

       const { loading, error, posts } = useSelector((state) => state.userPost);

    const { error: followError, message, loading: followLoading } = useSelector((state) => state.like);

    const [followersToggle, setFollowersToggle] = useState(false);

    const [followingToggle, setFollowingToggle] = useState(false);

    const [following, setFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState(false);

    const params = useParams();

    const followHandler = async () => {

        setFollowing(!following)

        await dispatch(followAndUnfollowUser(user._id));

         dispatch(getUserProfile(params.id));

        // dispatch(loadUser());


    }

    useEffect(() => {

        dispatch(getUserPosts(params.id));
        dispatch(getUserProfile(params.id));

    }, [dispatch, params.id]);


    useEffect(() => {

        if (me._id === params.id) {
            setMyProfile(true);
        }

        if (user && user.followers) {
            user.followers.forEach((item) => {
                if (item._id === me._id) {
                    setFollowing(true);
                } else {
                    setFollowing(false);
                }
            })
        }
    }, [user, me._id, params.id])

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            });
        }


        if (followError) {
            alert.error(followError);
            dispatch({ type: "clearErrors" });
        }

        if (userError) {
            alert.error(followError);
            dispatch({ type: "clearErrors" });
        }

        if (message) {
            alert.success(message);
            dispatch({
                type: "clearMessage"
            });
        }



    }, [alert, error, message, followError, userError, dispatch]);


    return (

        loading === true || userLoading === true ?
            <Loader /> :
            <div className='account'>
                <div className="accountleft">

                    {
                        posts && posts.length > 0 ?
                            posts.map((post) => (
                                <Post
                                    key={post._id}
                                    postId={post._id}
                                    caption={post.caption}
                                    postImage={post.image.url}
                                    likes={post.likes}
                                    comments={post.comments}
                                    ownerImage={post.owner.avatar.url}
                                    ownerName={post.owner.name}
                                    ownerId={post.owner._id}
                                // homeAllSignupUserProfile={"homeAllSignupUserProfile"}

                                />
                            )) :

                            <Typography variant='h6'>User has not made any post</Typography>
                    }
                </div>

                <div className="accountright">

                    {
                        user && (
                            <>
                                <Avatar
                                    src={user.avatar.url}
                                    sx={{ height: "8vmax", width: "8vmax" }}
                                />

                                <Typography variant='h5'>{user.name}</Typography>

                                <div>
                                    <button onClick={() => setFollowersToggle(!followersToggle)}>
                                        <Typography>Followers</Typography>
                                    </button>
                                    <Typography>{user.followers.length}</Typography>
                                </div>


                                <div>
                                    <button onClick={() => setFollowingToggle(!followingToggle)}>
                                        <Typography>Following</Typography>
                                    </button>
                                    <Typography>{user.following.length}</Typography>
                                </div>


                                <div>
                                    <Typography>Posts</Typography>

                                    <Typography>{user.posts.length}</Typography>
                                </div>

                                {myProfile ? null : (
                                    <Button
                                        variant="contained"
                                        style={{ background: following ? "red" : "" }}
                                        onClick={followHandler}
                                        disabled={followLoading}
                                    >
                                        {following ? "Unfollow" : "Follow"}
                                    </Button>
                                )}


                            </>

                        )
                    }


                    {/* Followers Dialog box */}
                    <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>

                        <div className="DialogBox">

                            <Typography variant='h4'>Followers</Typography>

                            {
                                user && user.followers.length > 0 ?
                                    user.followers.map((follower) => (
                                        <User
                                            key={follower._id}
                                            userId={follower._id}
                                            name={follower.name}
                                            avatar={follower.avatar.url}
                                        />

                                    )) :

                                    <Typography style={{ margin: "2vmax" }}>You have no followers</Typography>
                            }

                        </div>

                    </Dialog>



                    {/* Following Dialog box */}
                    <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>

                        <div className="DialogBox">

                            <Typography variant='h4'>Following</Typography>

                            {
                                user && user.following.length > 0 ?
                                    user.following.map((following) => (
                                        <User
                                            key={following._id}
                                            userId={following._id}
                                            name={following.name}
                                            avatar={following.avatar.url}
                                        />

                                    )) :

                                    <Typography style={{ margin: "2vmax" }}>You're not following anyone</Typography>
                            }

                        </div>

                    </Dialog>


                </div>

            </div>
    )
}



export default UserProfile
