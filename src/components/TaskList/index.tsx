import { SortableContext } from '@dnd-kit/sortable'
import { FC, useState } from 'react'
import { TaskItem } from '../TaskItem'
import { useDroppable } from '@dnd-kit/core'
import { useAppDispatch, useAppSelector } from '../../hook'
import { addTodoToList } from '../../store/shop/slice'
import { Button, Input } from 'antd'

type typeTaskList = {
  name: string
  tasks: string[]
  id: string
}

export const TaskList: FC<typeTaskList> = props => {
  const dispatch = useAppDispatch()
  const { setNodeRef } = useDroppable({ id: props.name })
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
  const handleAddTodoToList = (listId: string) => {
    handleSubmitCard(listId)
  }
  const handleAddCard = () => {
    setIsAddingCard(true)
  }
  const handleCancel = () => {
    setIsAddingCard(false)
    setNewCardTitle('')
  }

  return (
    <article className='column'>
      <h2>{props.name}</h2>
      <div></div>
      <SortableContext id={props.name} items={props.tasks}>
        <ul ref={setNodeRef} className='list'>
          {props.tasks.map((task, index) => (
            <TaskItem key={index} title={task} />
          ))}
          {isAddingCard ? (
            <div style={{ padding: '8px' }}>
              <Input
                placeholder='Enter card text'
                onChange={e => setNewCardTitle(e.target.value)}
                onPressEnter={handleAddCard}
              />
              <Button onClick={() => handleAddTodoToList(props.id)}>
                Add Todo to List {props.id}
              </Button>
              <Button onClick={handleCancel}>x</Button>
            </div>
          ) : (
            <div className='main__addCard' onClick={handleAddCard}>
              + Add Card
            </div>
          )}
        </ul>
      </SortableContext>
    </article>
  )
}
