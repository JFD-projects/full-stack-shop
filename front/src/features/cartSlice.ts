import { setToLocalStorage, getFromLocalStorage } from './../services/localStorage';
import { IProduct } from '../models/IProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string[] = getFromLocalStorage('cart') || []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartProduct: (state, action: PayloadAction<string>) => {
            state.push(action.payload)
            setToLocalStorage(state, 'cart')
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            const newState = state.filter(productId => productId !== action.payload)
            setToLocalStorage(newState, 'cart')
            return newState
        },
        decrimentProductCount: (state, action: PayloadAction<string>) => {
            const indexId = state.indexOf(action.payload)
            return state.slice(indexId, 1)
        },
    }
})

export const { addCartProduct, removeProduct, decrimentProductCount } = cartSlice.actions

export default cartSlice.reducer