import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { ImageType, IModel } from '../../types'

const initialState: IModel[] = []

export const createCustomSlice = (name: string) => {
  const {
    actions: {
      add,
      remove,
      reorder,
      update,
      editText,
      editDescription,
      editImage,
      deleteImage,
    },
    reducer,
  } = createSlice({
    name,
    initialState,
    reducers: {
      add: {
        reducer: (state, action: PayloadAction<IModel>) => {
          state.push(action.payload)
        },
        prepare: (text: string) => ({
          payload: {
            id: uuidv4(),
            text,
            isFinished: false,
          } as IModel,
        }),
      },
      update(state, action) {
        state.splice(
          action.payload.destination.index,
          0,
          action.payload.filterState,
        )
      },
      editText: (
        state,
        action: PayloadAction<{ id: string; newText: string }>,
      ) => {
        const { id, newText } = action.payload
        const model = state.find(model => model.id === id)
        if (model) {
          model.text = newText
        }
      },
      editDescription: (
        state,
        action: PayloadAction<{ id: string; newTextArea: string }>,
      ) => {
        const { id, newTextArea } = action.payload
        const model = state.find(model => model.id === id)
        if (model) {
          model.description = newTextArea
        }
      },
      editImage: (
        state,
        action: PayloadAction<{ id: string; newImage: ImageType }>,
      ) => {
        const { id, newImage } = action.payload
        const modelIndex = state.findIndex(model => model.id === id)
        if (modelIndex !== -1) {
          return state.map((model, index) => {
            if (index === modelIndex) {
              return { ...model, image: newImage }
            }
            return model
          })
        }
        return state
      },
      deleteImage: (
        state,
        action: PayloadAction<{ id: string; newImage: null }>,
      ) => {
        const { id, newImage } = action.payload
        const model = state.find(model => model.id === id)
        if (model) {
          model.image = newImage
        }
      },

      remove(state, action: PayloadAction<string>) {
        const index = state.findIndex(({ id }) => id === action.payload)
        state.splice(index, 1)
      },
      reorder(state, action) {
        const [removed] = state.splice(action.payload.source.index, 1)
        state.splice(action.payload.destination.index, 0, removed)
      },
    },
  })

  return {
    actions: {
      add,
      remove,
      reorder,
      update,
      editText,
      editDescription,
      editImage,
      deleteImage,
    },
    reducer,
  }
}
