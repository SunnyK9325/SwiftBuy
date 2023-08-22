import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,

    // using these reducers we can create actions
    reducers: {
        addToCart: (state, action) => {
            // will check if we have this item already in our cart
            // will go through each item and check if item id equal to payload.id
            const item = state.products.find(item => item.id === action.payload.id);

            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }

            // NOTE: Using simple redux we couldn't push the item directly like that or can't change the object property like quantity like that
            // but redux toolkit using a library called immutable.js which enable us to do that.
        },
        removeItem: (state, action) => {
            // when we dispatch the remove action, we will send the product id and filter out our items
            state.products = state.products.filter(item => item.id !== action.payload);
        },
        resetCart: (state) => {
            state.products = [];
        }
    }
})

export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;