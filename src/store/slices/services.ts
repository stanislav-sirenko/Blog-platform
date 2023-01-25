import { createAsyncThunk } from '@reduxjs/toolkit'

import { ArticlesState } from '../../interfaces/article'
import { UserState, PostDataCreateUser, PostDataLoginUser } from '../../interfaces/user'

const _defaultPath = 'https://blog.kata.academy/api'

export const fetchArticles = createAsyncThunk<ArticlesState, undefined, { rejectValue: string }>(
  'articles/fetchArticles',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`${_defaultPath}/articles?limit=5`)
    !response.ok && rejectWithValue('search articles')
    return await response.json()
  }
)

export const fetchArticle = createAsyncThunk<ArticlesState, string | undefined, { rejectValue: string }>(
  'articles/fetchArticle',
  async function (slug, { rejectWithValue }) {
    const response = await fetch(`${_defaultPath}/articles/${slug}`)
    !response.ok && rejectWithValue('search article')
    return await response.json()
  }
)

export const fetchPageNumber = createAsyncThunk<ArticlesState, number, { rejectValue: string }>(
  'articles/fetchPageNumber',
  async function (pageNumber, { rejectWithValue }) {
    const response = await fetch(`${_defaultPath}/articles?limit=5&offset=${pageNumber * 5 - 5}`)
    !response.ok && rejectWithValue('search page number')
    return await response.json()
  }
)

export const fetchRegistrationUser = createAsyncThunk<UserState, PostDataCreateUser, { rejectValue: string }>(
  'user/fetchRegistrationUser',
  async (validData, { rejectWithValue }) => {
    const response = await fetch(`${_defaultPath}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validData),
    })
    if (response.status === 422) {
      return rejectWithValue('A user with the same username or email address exists')
    }
    const result = await response.json()
    !localStorage.getItem('token') && localStorage.setItem('token', result.user.token)
    return result
  }
)

export const fetchAuthorizationUser = createAsyncThunk<UserState, PostDataLoginUser, { rejectValue: string }>(
  'user/fetchAuthorizationUser',
  async (validData, { rejectWithValue }) => {
    const response = await fetch(`${_defaultPath}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validData),
    })
    if (response.status === 422) {
      return rejectWithValue('Login or password is incorrect')
    }
    const result = await response.json()
    !localStorage.getItem('token') && localStorage.setItem('token', result.user.token)
    console.log(result)
    return result
  }
)