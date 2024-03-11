import { AnyAction } from "@reduxjs/toolkit"
import { IModel, ImageType } from "../types"
import { StoreDispatch } from "../redux/store"

export interface IColumnLayoutProps {
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
  isModalOpen: boolean
  handleCancelModal: () => void
  handleSubmitCard: () => void
  isAddingCard: boolean
  handleAddCard: () => void
  handleOpenModal: (
    id: string,
    text: string,
    description: string,
    image: ImageType,
  ) => void
  handleCancel: () => void
  handleEditModalText: (newText: string) => void
  handleEditModalDescription: (newTextArea: string) => void
  handleEditImage: (newImage: ImageType) => void
  handleDeleteImage: () => void
  selectedItem: IModel | null
  setNewCardTitle: (newValue: string) => void
  dispatch: StoreDispatch
}
