import { configureStore } from "@reduxjs/toolkit";
import storageReducer from "./storageSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer:{
        userStorage: storageReducer,
        cart: cartReducer,
    }
});

export default store;
