import { createSlice } from "@reduxjs/toolkit"

const storageSlice = createSlice({
    name: "userStorage",
    initialState:{
        userData: null,
        isLoggedIn: false,
    },
    reducers: {
        addUserData: (state, action) => {
            state.userData = action.payload;
        },

        isUserLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
        // clearUserData : (state, action) => {
        //     state.userData = "";
        // }
    }    
})

export const {addUserData, isUserLoggedIn} = storageSlice.actions;
export default storageSlice.reducer;