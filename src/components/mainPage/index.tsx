import { ChangeEvent, useState } from 'react'
import { Button, Card, Input, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hook'
import {
  addTodoToList,
  editTodo,
  editDescription,
  editImage,
  editTitle,
  deleteImage,
} from '../../store/shop/slice'

const MainPage: React.FC = () => {
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalId, setModalId] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [textArea, setTextArea] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null)
  const cards = useAppSelector(state => state.shopReducer.TODOS)
  const Listss = useAppSelector(state => state.shopReducer.lists)
  console.log(Listss, 'Listsssssssssssss')
  // console.log(cards, 'cards')
  const dispatch = useAppDispatch()

  const showModal = (
    id: string,
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

  const handleSubmitCard = (listId: string) => {
    if (newTitle.trim() !== '') {
      const todo = {
        title: newTitle.trim(),
        id: Date.now().toString(), // Generate a unique ID for the todo
        description: '',
        image: null,
      }
      dispatch(addTodoToList({ listId, todo }))
      setIsAddingCard(false)
      setNewTitle('')
    } else {
      setIsAddingCard(false)
    }
  }
  const handleAddTodoToList = (listId: string) => {
    handleSubmitCard(listId)
  }
  return (
    <div className='main'>
      {Listss.map(list => (
        <Card
          key={list.id}
          title={list.name}
          bordered={false}
          style={{ width: 300, marginRight: '20px' }}
        >
          {list.todos.map(todo => (
            <div
              draggable={true}
              key={todo.id}
              onClick={() =>
                showModal(todo.id, todo.title, todo.description, todo.image)
              }
              className='main__card'
            >
              {todo.image && (
                <img
                  src={todo.image}
                  alt='Card Image'
                  style={{ width: '100%', height: '150px' }}
                />
              )}
              <Card>{todo.title}</Card>
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
                <Input
                  type='text'
                  value={newTitle}
                  onChange={handleEditTitle}
                />
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
                // onPressEnter={handleSubmitCard}
              />
              <Button onClick={() => handleAddTodoToList('1')}>
                Add Todo to List 1
              </Button>
              <button onClick={() => handleAddTodoToList('2')}>
                Add Todo to List 2
              </button>
              <button onClick={() => handleAddTodoToList('3')}>
                Add Todo to List 3
              </button>
              <Button onClick={handleCancel}>x</Button>
            </div>
          ) : (
            <div className='main__addCard' onClick={handleAddCard}>
              + Add Card
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

export default MainPage
