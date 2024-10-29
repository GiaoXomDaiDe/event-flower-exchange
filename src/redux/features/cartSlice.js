import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        add: (state, actions) => {state.push(actions.payload);},
        remove: () => {},
        clear: () => {},
    },
});

export const {add, remove, clear} = cartSlice.actions
export default cartSlice.reducer;