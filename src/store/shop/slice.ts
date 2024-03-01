import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './typeShop'
import { PayloadAction } from '@reduxjs/toolkit'
export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.TODOS.push(action.payload)
    },
    editTodo(
      state,
      action: PayloadAction<{
        id: number
      }>,
    ) {
      const { id } = action.payload
      const todoIndex = state.TODOS.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
      }
    },
    editTitle(state, action: PayloadAction<{ id: number; title: string }>) {
      const { id, title } = action.payload
      const todoIndex = state.TODOS.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        state.TODOS[todoIndex].title = title
      }
    },
    editDescription(
      state,
      action: PayloadAction<{ id: number; description: string }>,
    ) {
      const { id, description } = action.payload
      const todoIndex = state.TODOS.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        state.TODOS[todoIndex].description = description
      }
    },
    editImage(
      state,
      action: PayloadAction<{ id: number; image: string | null }>,
    ) {
      const { id, image } = action.payload
      const todoIndex = state.TODOS.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        state.TODOS[todoIndex].image = image
      }
    },
    deleteImage(
      state,
      action: PayloadAction<{ id: number | null; image: null }>,
    ) {
      const { id, image } = action.payload
      const todoIndex = state.TODOS.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        state.TODOS[todoIndex].image = image
      }
    },
  },
})

export const {
  addTodo,
  editTitle,
  editDescription,
  editImage,
  editTodo,
  deleteImage,
} = shopSlice.actions
export default shopSlice.reducer
