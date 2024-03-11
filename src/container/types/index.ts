import { AnyAction } from '@reduxjs/toolkit'
import { IModel } from '../../types'

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
    newImage: string | null
  }) => AnyAction
  deleteImageHandler: (payload: { id: string; newImage: null }) => AnyAction
}
