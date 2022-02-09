import { setToLocalStorage, getFromLocalStorage } from './../services/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../models/IUser';
import jwt_decode from "jwt-decode";


const token = getFromLocalStorage('token')
const initialState: IUser | null = token ? jwt_decode(token) : null

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string | null>) => {
            return action.payload ? jwt_decode(action.payload) : null
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer