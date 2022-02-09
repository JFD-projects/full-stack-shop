import userSlice from './features/userSlice';
import favoriteSlice from './features/favoriteSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice'

const reducer = combineReducers({
    cart: cartSlice,
    favorite: favoriteSlice,
    user: userSlice
})

const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;