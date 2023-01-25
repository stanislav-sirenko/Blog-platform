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

// const _defaultPath = 'https://blog.kata.academy/api'

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

const userSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
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

export default userSlice.reducer
