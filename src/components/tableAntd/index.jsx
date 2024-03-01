import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { Card, Input, Button, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hook'
import {
  addTodo,
  editTodo,
  editDescription,
  editImage,
  editTitle,
  deleteImage,
} from '../../store/shop/slice'

const DraggableCard = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform, transition }}
      {...attributes}
      {...listeners}
    >
      <div key={card.id} className='main__card'>
        {card.image && (
          <img
            src={card.image}
            alt='Card Image'
            style={{ width: '100%', height: '150px' }}
          />
        )}
        <Card>{card.title}</Card>
      </div>
    </div>
  )
}

const MainPage = () => {
  const [cards, setCards] = useState(
    useAppSelector(state => state.shopReducer.TODOS),
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalId, setModalId] = (useState < number) | (null > null)
  const [newTitle, setNewTitle] = useState('')
  const [textArea, setTextArea] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [newImageUrl, setNewImageUrl] = (useState < string) | (null > null)
  const dispatch = useAppDispatch()

  const showModal = (id, title, description, image) => {
    setIsModalOpen(true)
    setModalId(id)
    setNewTitle(title)
    setTextArea(description)
    setNewImageUrl(image)
  }

  const handleOkModal = () => {
    setIsModalOpen(false)
    if (modalId !== null) {
      dispatch(editTodo({ id: modalId }))
    }
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
  }

  // Rest of your functions...

  return (
    <div className='main'>
      <Card
        title='Board'
        bordered={false}
        style={{ width: 300, marginRight: '20px' }}
      >
        {cards.map(card => (
          <DraggableCard key={card.id} card={card} />
        ))}
        {/* The rest of your modal and adding card logic */}
      </Card>
    </div>
  )
}

export default MainPage
