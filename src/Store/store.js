import { configureStore } from "@reduxjs/toolkit";
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer } from "../Reducers/User";
import { like_Comment_Reducer, myPostReducer, userPostReducer } from "../Reducers/Post";



const store = configureStore({

    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers : allUsersReducer,
        like: like_Comment_Reducer,
        myPosts : myPostReducer,
        userProfile : userProfileReducer,
        userPost : userPostReducer,
        

    }

});

export default store;