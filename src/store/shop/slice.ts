import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './typeShop'
import { PayloadAction } from '@reduxjs/toolkit'
import { Todo } from './typeShop'
export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addTodoToList: (
      state,
      action: PayloadAction<{ listId: string; todo: Todo }>,
    ) => {
      const { listId, todo } = action.payload
      const listIndex = state.lists.findIndex(list => list.id === listId)
      if (listIndex !== -1) {
        state.lists[listIndex].todos.push(todo)
      }
    },
    // addTodoToList: (
    //   state,
    //   action: PayloadAction<{ listId: string; todo: Todo }>,
    // ) => {
    //   const { listId, todo } = action.payload
    //   const listIndex = state.lists.findIndex(list => list.id === listId)
    //   if (listIndex !== -1) {
    //     state.lists[listIndex].todos = [...state.lists[listIndex].todos, todo] // Updating todos immutably
    //   }
    // },
    editTodo(
      state,
      action: PayloadAction<{
        id: string
      }>,
    ) {
      const { id } = action.payload
      const todoIndex = state.TODOS.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
      }
    },
    editTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const { id, title } = action.payload
      const todoIndex = state.TODOS.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        state.TODOS[todoIndex].title = title
      }
    },
    editDescription(
      state,
      action: PayloadAction<{ id: string; description: string }>,
    ) {
      const { id, description } = action.payload
      const todoIndex = state.TODOS.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        state.TODOS[todoIndex].description = description
      }
    },
    editImage(
      state,
      action: PayloadAction<{ id: string; image: string | null }>,
    ) {
      const { id, image } = action.payload
      const todoIndex = state.TODOS.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        state.TODOS[todoIndex].image = image
      }
    },
    deleteImage(
      state,
      action: PayloadAction<{ id: string | null; image: null }>,
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
  addTodoToList,
  editTitle,
  editDescription,
  editImage,
  editTodo,
  deleteImage,
} = shopSlice.actions
export default shopSlice.reducer
