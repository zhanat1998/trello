import { IModel, ImageType } from '../../types'

export interface ModalType {
  isModalOpen: boolean
  handleCancelModal: () => void
  selectedItem: IModel | null
  handleEditModalText: (newText: string) => void
  handleEditModalDescription: (newTextArea: string) => void
  handleEditImage: (newImage: ImageType) => void
  handleDeleteImage: () => void
}
