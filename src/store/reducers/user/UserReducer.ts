import { createSlice } from '@reduxjs/toolkit'
interface ISet {
    token:string,
    expiresAt:number
}
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    expiresAt:null
  },
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action.payload)

      state.token = action.payload.token
      state.expiresAt = action.payload.expiresAt
    },
    removeUser: (state) => {
        state.token = null
        state.expiresAt = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer