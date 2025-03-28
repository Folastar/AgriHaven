import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import favoritesReducer from "./features/favorite/favoriteSlice";
import cartSliceReducer from "./features/cart/cartSlice";
import shopReducer from "./features/shop/shopSlice";
const initialFavorites = getFavoritesFromLocalStorage() || [];
const store =configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        favorites: favoritesReducer,
        cart:cartSliceReducer,
        shop:shopReducer,
    },

    preloadedState: {
        favorites: initialFavorites,
      },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),devTools: true ,
    
})


setupListeners(store.dispatch)

export default store