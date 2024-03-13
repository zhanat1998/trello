import { useState } from 'react'
import { IModel, ImageType } from '../types'
import { useDispatch } from 'react-redux'
import { StoreDispatch } from '../redux/store'
import { ColumnLayout } from '../components/ColumnLayout'
import { ColumnContainerTypes } from './types'

export const ColumnContainer: React.FC<ColumnContainerTypes> = ({
  addHandler,
  removeHandler,
  selectorState,
  droppableId,
  editTextHandler,
  editAreaHandler,
  editImageHandler,
  deleteImageHandler,
}) => {
  const [newCardTitle, setNewCardTitle] = useState<string>('')
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    text: string
    description: string
    image: ImageType
  } | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | undefined | null>(
    null,
  )

  const handleSubmitCard = () => {
    if (newCardTitle.trim() !== '' && newCardTitle.length <= 200) {
      dispatch(addHandler(newCardTitle))
      setIsAddingCard(false)
      setNewCardTitle('')
    } else {
      setIsAddingCard(false)
    }
  }
  const handleAddCard = () => {
    setIsAddingCard(true)
  }
  const handleCancel = () => {
    setIsAddingCard(false)
    setNewCardTitle('')
  }
  const handleOpenModal = (
    id: string,
    text: string,
    description: string,
    image: ImageType,
  ) => {
    setSelectedItem({ id, text, description, image })
    setIsModalOpen(true)
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
  }
  const handleEditModalText = (newText: string) => {
    if (selectedItem) {
      dispatch(editTextHandler({ id: selectedItem.id, newText }))
      setSelectedItem(prevState => ({
        ...(prevState as IModel),
        text: newText,
      }))
    }
  }
  const handleEditModalDescription = (newTextArea: string) => {
    if (selectedItem) {
      dispatch(editAreaHandler({ id: selectedItem.id, newTextArea }))
      setSelectedItem(prevState => ({
        ...(prevState as IModel),
        description: newTextArea,
      }))
    }
  }

  const handleEditImage = (newImage: string | null | undefined) => {
    setSelectedImage(newImage)

    if (selectedItem) {
      dispatch(editImageHandler({ id: selectedItem.id, newImage }))
      setSelectedItem(prevState => ({
        ...(prevState as IModel),
        image: newImage,
      }))
    }
  }
  const handleDeleteImage = () => {
    if (selectedItem) {
      dispatch(deleteImageHandler({ id: selectedItem.id, newImage: null }))
      setSelectedItem(prevState => ({
        ...(prevState as IModel),
        image: null,
      }))
    }
  }
  const handleDeleteItem = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    dispatch(removeHandler(id))
  }
  const dispatch = useDispatch<StoreDispatch>()

  return (
    <ColumnLayout
      selectorState={selectorState}
      removeHandler={removeHandler}
      droppableId={droppableId}
      isModalOpen={isModalOpen}
      handleCancelModal={handleCancelModal}
      handleSubmitCard={handleSubmitCard}
      isAddingCard={isAddingCard}
      handleAddCard={handleAddCard}
      handleOpenModal={handleOpenModal}
      handleCancel={handleCancel}
      handleEditModalText={handleEditModalText}
      handleEditModalDescription={handleEditModalDescription}
      handleEditImage={handleEditImage}
      handleDeleteImage={handleDeleteImage}
      selectedItem={selectedItem}
      setNewCardTitle={setNewCardTitle}
      addHandler={addHandler}
      editTextHandler={editTextHandler}
      editAreaHandler={editAreaHandler}
      editImageHandler={editImageHandler}
      deleteImageHandler={deleteImageHandler}
      dispatch={dispatch}
      handleDeleteItem={handleDeleteItem}
      selectedImage={selectedImage}
    />
  )
}
