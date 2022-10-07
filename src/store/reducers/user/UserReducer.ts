import { createSlice } from '@reduxjs/toolkit'
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
      state.auth = action.payload?.auth
      state.profile = action.payload?.profile
    },
    removeUser: (state) => {
      state.auth = initialState.auth
      state.profile = initialState.profile
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer