import { setToLocalStorage, getFromLocalStorage } from './../services/localStorage';
import { IProduct } from '../models/IProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string[] = getFromLocalStorage('favorite') || []

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavoriteProduct: (state, action: PayloadAction<string>) => {
            state.push(action.payload)
            setToLocalStorage(state, 'favorite')
        },
        removeFavoriteProduct: (state, action: PayloadAction<string>) => {
            const newState = state.filter(productId => productId !== action.payload)
            setToLocalStorage(newState, 'favorite')
            return newState
        },
        decrimentFavoriteProductCount: (state, action: PayloadAction<string>) => {
            const indexId = state.indexOf(action.payload)
            return state.slice(indexId, 1)
        },
    }
})

export const { addFavoriteProduct, removeFavoriteProduct, decrimentFavoriteProductCount } = favoriteSlice.actions

export default favoriteSlice.reducer