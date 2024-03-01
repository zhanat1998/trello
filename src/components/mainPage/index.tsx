import { ChangeEvent, useState } from 'react'
import { Button, Card, Input, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hook'
import {
  addTodo,
  editTodo,
  editDescription,
  editImage,
  editTitle,
  deleteImage,
} from '../../store/shop/slice'

const MainPage: React.FC = () => {
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalId, setModalId] = useState<number | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [textArea, setTextArea] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null)
  const cards = useAppSelector(state => state.shopReducer.TODOS)
  const dispatch = useAppDispatch()

  const showModal = (
    id: number,
    title: string,
    description: string,
    image: string | null,
  ) => {
    setIsModalOpen(true)
    setNewTitle(title)
    setModalId(id)
    setTextArea(description)
    setNewImageUrl(image)
  }

  const handleOkModal = () => {
    setIsModalOpen(false)
    if (modalId !== null) {
      dispatch(
        editTodo({
          id: modalId,
        }),
      )
    }
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
  }
  const handleAddCard = () => {
    setIsAddingCard(true)
  }
  const handleCancel = () => {
    setIsAddingCard(false)
    setNewTitle('')
  }
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setNewImageUrl(imageUrl)
    }
  }
  const handleImageEdit = () => {
    setEditMode(false)
    if (modalId !== null) {
      dispatch(editImage({ id: modalId, image: newImageUrl }))
    }
  }
  const handleDeleteImage = () => {
    setNewImageUrl(null)
    dispatch(deleteImage({ id: modalId, image: null }))
  }

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  }
  const handleSaveTitle = () => {
    setEditMode(false)
    if (modalId !== null) {
      dispatch(editTitle({ id: modalId, title: newTitle }))
    }
  }
  const handleDescriptionEdit = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(event.target.value)
  }
  const handleSaveDescription = () => {
    setEditMode(false)
    if (modalId !== null) {
      dispatch(editDescription({ id: modalId, description: textArea }))
    }
  }

  const handleSubmitCard = () => {
    if (newTitle.trim() !== '') {
      dispatch(
        addTodo({
          id: Date.now(),
          title: newTitle.trim(),
        }),
      )
      setIsAddingCard(false)
      setNewTitle('')
    } else {
      setIsAddingCard(false)
    }
  }
  return (
    <div className='main'>
      <Card
        title='Board'
        bordered={false}
        style={{ width: 300, marginRight: '20px' }}
      >
        {cards.map(card => (
          <div
            draggable={true}
            key={card.id}
            onClick={() =>
              showModal(card.id, card.title, card.description, card.image)
            }
            className='main__card'
          >
            {card.image && (
              <img
                src={card.image}
                alt='Card Image'
                style={{ width: '100%', height: '150px' }}
              />
            )}
            <Card>{card.title}</Card>
          </div>
        ))}
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onOk={handleOkModal}
            onCancel={handleCancelModal}
            style={{ width: '1400px', height: '800px' }}
          >
            <div style={{ margin: '20px' }}>
              <Input type='text' value={newTitle} onChange={handleEditTitle} />
              <Button type='primary' onClick={handleSaveTitle}>
                Save
              </Button>
              <div style={{ marginTop: '20px' }}>
                <h3>Description</h3>
                {editMode ? (
                  <div>
                    <Input.TextArea
                      maxLength={1000}
                      value={textArea}
                      onChange={handleDescriptionEdit}
                      placeholder='Description'
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                    <Button type='primary' onClick={handleSaveDescription}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <span>{textArea}</span>
                    <Button type='link' onClick={() => setEditMode(true)}>
                      Edit
                    </Button>
                  </div>
                )}
              </div>
              <span>image</span>
              <input type='file' onChange={handleImageChange} />
              {newImageUrl && (
                <div style={{ marginTop: '20px' }}>
                  <img src={newImageUrl} width='200px' height='200px' />
                  <Button onClick={handleImageEdit}>Save</Button>
                  <Button onClick={handleDeleteImage}>Удалить</Button>
                </div>
              )}
            </div>
          </Modal>
        )}
        {isAddingCard ? (
          <div style={{ padding: '8px' }}>
            <Input
              placeholder='Enter card text'
              onChange={e => setNewTitle(e.target.value)}
              onPressEnter={handleSubmitCard}
            />
            <Button
              type='primary'
              onClick={handleSubmitCard}
              style={{ marginTop: '8px' }}
            >
              Add
            </Button>
            <Button onClick={handleCancel}>x</Button>
          </div>
        ) : (
          <div className='main__addCard' onClick={handleAddCard}>
            + Add Card
          </div>
        )}
      </Card>
    </div>
  )
}

export default MainPage
