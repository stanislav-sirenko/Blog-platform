import { createSlice } from '@reduxjs/toolkit'

import { ArticlesState } from '../../interfaces/article'

import { fetchArticles, fetchArticle, fetchPageNumber } from './services'

const initialState: ArticlesState = {
  articles: [],
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    createdAt: '',
    updatedAt: '',
    tagList: [],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
  articlesCount: 0,
  status: null,
  error: null,
  currentPage: 1,
}

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    togglePage(state, action) {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = false
        state.articles = action.payload.articles
        state.error = null
        state.articlesCount = action.payload.articlesCount
      })

      .addCase(fetchArticle.pending, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = false
        state.article = action.payload.article
        state.error = null
      })

      .addCase(fetchPageNumber.pending, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(fetchPageNumber.fulfilled, (state, action) => {
        state.status = false
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
      })
  },
})

export const { togglePage } = articleSlice.actions

export default articleSlice.reducer
