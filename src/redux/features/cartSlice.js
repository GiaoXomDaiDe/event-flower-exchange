import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    add: (state, actions) => {
      if (!state) state = []

      const index = state.findIndex((item) => item.flowerId === actions.payload.flowerId)

      if (index !== -1) {
        state[index].quantity += 1
      } else {
        state.push({ ...actions.payload, quantity: 1 })
      }
      return state
    },
    increaseQuantity: (state, actions) => {
      const index = state.findIndex((item) => item.flowerId === actions.payload)
      if (index !== -1) {
        state[index].quantity += 1
      }
    },
    decreaseQuantity: (state, actions) => {
      const index = state.findIndex((item) => item.flowerId === actions.payload)
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1
        } else {
          state.splice(index, 1)
        }
      }
    },
    remove: () => {},
    clear: () => {}
  }
})

export const { add, increaseQuantity, decreaseQuantity, remove, clear } = cartSlice.actions
export default cartSlice.reducer
