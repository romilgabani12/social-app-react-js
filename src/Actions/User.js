import axios from "axios";
import { server } from "../index";


export const loginUser = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type: "LoginRequest",
        });

        const { data } = await axios.post(`${server}/api/v1/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        dispatch({
            type: "LoginSuccess",
            payload: data.user,

        });

    } catch (error) {

        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        })

    }
};


export const registerUser = (name, email, password, avatar) => async (dispatch) => {

    try {

        dispatch({
            type: "RegisterRequest",
        });

        const { data } = await axios.post(`${server}/api/v1/register`, { name, email, password, avatar }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        dispatch({
            type: "RegisterSuccess",
            payload: data.user,
        });

    } catch (error) {

        dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message,
        })

    }
};




export const loadUser = () => async (dispatch) => {

    try {

        dispatch({
            type: "LoadUserRequest",
        });

        const { data } = await axios.get(`${server}/api/v1/get/me`,{withCredentials: true});

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });

    } catch (error) {

        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message,
        })

    }
};



export const getFollowingPosts = () => async (dispatch) => {

    try {

        dispatch({
            type: "postOfFollowingRequest",
        });

        const { data } = await axios.get(`${server}/api/v1/posts`,{withCredentials: true});

        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts,
        });


    } catch (error) {

        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message,
        });

    }
}



export const getAllUsers = (name="") => async (dispatch) => {

    try {

        dispatch({
            type: "allUsersRequest",
        });

        const { data } = await axios.get(`${server}/api/v1/users?name=${name}`,{withCredentials: true});

        dispatch({
            type: "allUsersSuccess",
            payload: data.users,
        });


    } catch (error) {

        dispatch({
            type: "allUsersFailure",
            payload: error.response.data.message,
        });

    }
}





export const getMyPosts = () => async (dispatch) => {

    try {

        dispatch({
            type: "myPostRequest",
        });

        const { data } = await axios.get(`${server}/api/v1/my/posts`,{withCredentials: true});

        dispatch({
            type: "myPostSuccess",
            payload: data.posts,
        });


    } catch (error) {

        dispatch({
            type: "myPostFailure",
            payload: error.response.data.message,
        });

    }
}



export const logoutUser = () => async (dispatch) => {

    try {

        dispatch({
            type: "LogoutUserRequest",
        });

        await axios.get(`${server}/api/v1/logout`,{withCredentials: true});

        dispatch({
            type: "LogoutUserSuccess",

        });

    } catch (error) {

        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message,
        })

    }
};



export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest",
        });

        const { data } = await axios.put(`${server}/api/v1/update/profile`,
            {
                avatar,
                name,
                email,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        );

        dispatch({
            type: "updateProfileSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message,
        });

    }
}



export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "changePasswordRequest",
        });

        const { data } = await axios.put(`${server}/api/v1/update/password`,
            {
                oldPassword,
                newPassword
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        );

        dispatch({
            type: "changePasswordSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "changePasswordFailure",
            payload: error.response.data.message,
        });

    }
}





export const deleteMyProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProfileRequest",
        });

        const { data } = await axios.delete(`${server}/api/v1/delete/me`,{withCredentials: true});

        dispatch({
            type: "deleteProfileSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "deleteProfileFailure",
            payload: error.response.data.message,
        });

    }
}


export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "forgotPasswordRequest",
        });

        const { data } = await axios.post(`${server}/api/v1/forgot/password`,
            {
                email,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true

            });

        dispatch({
            type: "forgotPasswordSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "forgotPasswordFailure",
            payload: error.response.data.message,
        });

    }
}



export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest",
        });

        const { data } = await axios.put(`${server}/api/v1/password/reset/${token}`,
            {
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true

            });

        dispatch({
            type: "resetPasswordSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "resetPasswordFailure",
            payload: error.response.data.message,
        });

    }
}




export const getUserPosts = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "userPostRequest",
        });

        const { data } = await axios.get(`${server}/api/v1/userposts/${id}`,{withCredentials: true});

        dispatch({
            type: "userPostSuccess",
            payload: data.posts,
        });


    } catch (error) {

        dispatch({
            type: "userPostFailure",
            payload: error.response.data.message,
        });

    }
}



export const getUserProfile = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "userProfileRequest",
        });

        const { data } = await axios.get(`${server}/api/v1/user/${id}`,{withCredentials: true});

        dispatch({
            type: "userProfileSuccess",
            payload: data.user,
        });


    } catch (error) {

        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message,
        });

    }
}




export const followAndUnfollowUser = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "followAndUnfollowRequest",
        });

        const { data } = await axios.get(`${server}/api/v1/follow/${id}`,{withCredentials: true});

        dispatch({
            type: "followAndUnfollowSuccesss",
            payload: data.message,
        });


    } catch (error) {

        dispatch({
            type: "followAndUnfollowFailure",
            payload: error.response.data.message,
        });

    }
}