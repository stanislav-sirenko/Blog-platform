import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './slices/article-slice'
import userReducer from './slices/user-slice'

const store = configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
