import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit'

import { UserState } from '../../interfaces/user'

import { fetchRegistrationUser, fetchAuthorizationUser } from './services'

const initialState: UserState = {
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
  error: '',
  status: null,
  isReg: false,
  isAuth: false,
  update: false,
}

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state) {
      localStorage.removeItem('token')
      state.user = {
        email: '',
        token: '',
        username: '',
        bio: '',
        image: '',
      }
      state.isAuth = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrationUser.pending, (state) => {
        state.status = true
        state.isReg = false
        state.error = ''
      })
      .addCase(fetchRegistrationUser.fulfilled, (state) => {
        state.status = false
        state.isReg = true
      })
      .addCase(fetchAuthorizationUser.pending, (state) => {
        state.status = true
        state.error = ''
        state.isAuth = false
      })
      .addCase(fetchAuthorizationUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.status = false
        state.isAuth = true
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.status = false
        state.error = action.payload
      })
  },
})

export const { logOut } = userSlice.actions

export default userSlice.reducer
