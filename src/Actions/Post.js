import axios from "axios";
import { server } from "../index";

export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeRequest",
        });

        const { data } = await axios.get(`${server}/api/v1/post/${id}`, { withCredentials: true });

        dispatch({
            type: "likeSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "likeFailure",
            payload: error.response.data.message,
        });

    }
}





export const addCommentOnPost = (id, comment) => async (dispatch) => {
    try {
        dispatch({
            type: "addCommetRequest",
        });

        const { data } = await axios.put(`${server}/api/v1/post/comment/${id}`,
            {
                comment,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }

        );

        dispatch({
            type: "addCommetSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "addCommetFailure",
            payload: error.response.data.message,
        });

    }
}





export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCommetRequest",
        });

        const { data } = await axios.delete(`${server}/api/v1/post/comment/${id}`, {
            data: { commentId }
        },
            { withCredentials: true }
        );

        dispatch({
            type: "deleteCommetSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "deleteCommetFailure",
            payload: error.response.data.message,
        });

    }
}



export const createNewPost = (caption, image) => async (dispatch) => {
    try {
        dispatch({
            type: "newPostRequest",
        });

        const { data } = await axios.post(`${server}/api/v1/post/upload`,
            {
                caption,
                image,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        );

        dispatch({
            type: "newPostSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "newPostFailure",
            payload: error.response.data.message,
        });

    }
}



export const updateCaptionPost = (caption, id) => async (dispatch) => {
    try {
        dispatch({
            type: "updateCaptionRequest",
        });

        const { data } = await axios.put(`${server}/api/v1/post/${id}`,
            {
                caption,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        );

        dispatch({
            type: "updateCaptionSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "updateCaptionFailure",
            payload: error.response.data.message,
        });

    }
}


export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deletePostRequest",
        });

        const { data } = await axios.delete(`${server}/api/v1/post/${id}`, { withCredentials: true });

        dispatch({
            type: "deletePostSuccesss",
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: "deletePostFailure",
            payload: error.response.data.message,
        });

    }
}





