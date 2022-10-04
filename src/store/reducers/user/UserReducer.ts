import { createSlice } from '@reduxjs/toolkit'
interface ISet {
  token: string,
  expiresAt: number
}
const initialState = {
  auth: {
    token: null,
    expiresAt: null
  },
  profile: null

}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log("payload", action.payload)
      state.auth = action.payload?.auth
      state.profile = action.payload?.profile
    },
    removeUser: (state) => {
      //TODO remove user from local storage
      state.auth = initialState.auth
      state.profile = initialState.profile
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer