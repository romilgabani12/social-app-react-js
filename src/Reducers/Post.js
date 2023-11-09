import { createReducer } from "@reduxjs/toolkit";

const initialState = {}


export const like_Comment_Reducer = createReducer(initialState, {
    // likes Reducer
    likeRequest: (state) => {
        state.loading = true;
    },
    likeSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    likeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // add comment reducer
    addCommetRequest: (state) => {
        state.loading = true;
    },
    addCommetSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addCommetFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // delete comment reducer
    deleteCommetRequest: (state) => {
        state.loading = true;
    },
    deleteCommetSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteCommetFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },


    // newPost Reducer
    newPostRequest: (state) => {
        state.loading = true;
    },
    newPostSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    newPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // updateCaption Reducer
    updateCaptionRequest: (state) => {
        state.loading = true;
    },
    updateCaptionSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateCaptionFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },


    // deletePost Reducer
    deletePostRequest: (state) => {
        state.loading = true;
    },
    deletePostSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },


    // updateProfile Reducer
    updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },



    // changePassword Reducer
    changePasswordRequest: (state) => {
        state.loading = true;
    },
    changePasswordSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    changePasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },



    // deleteProfile Reducer
    deleteProfileRequest: (state) => {
        state.loading = true;
    },
    deleteProfileSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },



    // Forgot Password Reducer
    forgotPasswordRequest: (state) => {
        state.loading = true;
    },
    forgotPasswordSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },


    // Reset Password Reducer
    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },


    // follow And Unfollow User Reducer
    followAndUnfollowRequest: (state) => {
        state.loading = true;
    },
    followAndUnfollowSuccesss: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    followAndUnfollowFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },



    clearErrors: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
})



export const myPostReducer = createReducer(initialState, {

    myPostRequest: (state) => {
        state.loading = true;
    },
    myPostSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;

    },
    myPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})



export const userPostReducer = createReducer(initialState, {

    userPostRequest: (state) => {
        state.loading = true;
    },
    userPostSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;

    },
    userPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})






