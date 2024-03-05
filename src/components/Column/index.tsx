import { FC, useState } from 'react'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import Card, { CardType } from '../Card'
import { Button, Input } from 'antd'
import { useAppDispatch } from '../../hook'
import { addTodoToList } from '../../store/shop/slice'

export type ColumnType = {
  id: string
  name: string
  cards: CardType[]
}

const Column: FC<ColumnType> = ({ id, name, cards }) => {
  const { setNodeRef } = useDroppable({ id: id })
  const dispatch = useAppDispatch()
  const [newCardTitle, setNewCardTitle] = useState('')
  const [isAddingCard, setIsAddingCard] = useState(false)
  const handleSubmitCard = (listId: string) => {
    if (newCardTitle.trim() !== '') {
      const todo = {
        title: newCardTitle.trim(),
        id: Date.now().toString(),
        description: '',
        image: null,
      }
      dispatch(addTodoToList({ listId, todo }))
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

  return (
    <>
      <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          style={{
            width: '200px',
            background: 'rgba(245,247,249,1.00)',
            marginRight: '10px',
          }}
        >
          <p
            style={{
              padding: '5px 20px',
              textAlign: 'left',
              fontWeight: '500',
              color: '#575757',
            }}
          >
            {name}
          </p>
          {cards.map(card => (
            <Card
              key={card.id}
              id={card.id}
              description={card.description}
              image={card.image}
              title={card.title}
            ></Card>
          ))}
        </div>
      </SortableContext>
      {isAddingCard ? (
        <div style={{ padding: '8px' }}>
          <Input
            placeholder='Enter card text'
            onChange={e => setNewCardTitle(e.target.value)}
            onPressEnter={handleAddCard}
          />
          <Button onClick={() => handleSubmitCard(id)}>
            Add Todo to List {id}
          </Button>
          <Button onClick={handleCancel}>x</Button>
        </div>
      ) : (
        <div className='main__addCard' onClick={handleAddCard}>
          + Add Card
        </div>
      )}
    </>
  )
}

export default Column
