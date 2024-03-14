import { AnyAction } from '@reduxjs/toolkit'
import { IModel, ImageType, exist, initialState } from '../../types'

export interface ColumnContainerTypes {
  labelText: string
  addHandler: (v: string) => AnyAction
  removeHandler: (v: string) => AnyAction
  selectorState: IModel[]
  droppableId: string
  editTextHandler: (payload: { id: string; newText: string }) => AnyAction
  editAreaHandler: (payload: { id: string; newTextArea: string }) => AnyAction
  editImageHandler: (payload: {
    id: string
    newImage: string | null | undefined
  }) => AnyAction
  deleteImageHandler: (payload: { id: string; newImage: null }) => AnyAction
}
export interface Member {
  id: number
  name: string
  picture: string
}
export type TItem = {
  id: string
  text: string
  description: string
  image: ImageType
}
