import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import '../MainTaskList/MainTaskList.scss'
import { useAppDispatch, useAppSelector } from '../../hook'
import Column, { ColumnType } from '../Column'
import { updateLists } from '../../store/shop/slice'

export const MainTaskList = () => {
  const data = useAppSelector(state => state.shopReducer.lists)
  const dispatch = useAppDispatch()

  console.log(data, 'data')
  const [columns, setColumns] = useState<ColumnType[]>(data)
  useEffect(() => {
    setColumns(data)
  }, [data])
  console.log(columns, 'columns')
  // useEffect(() => {
  //   dispatch(updateLists(columns))
  // }, [columns, dispatch])
  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null
    }
    if (columns.some(c => c.id === unique)) {
      return columns.find(c => c.id === unique) ?? null
    }
    const id = String(unique)
    const itemWithColumnId = columns.flatMap(c => {
      const columnId = c.id
      return c.cards.map(i => ({ itemId: i.id, columnId: columnId }))
    })
    const columnId = itemWithColumnId.find(i => i.itemId === id)?.columnId
    return columns.find(c => c.id === columnId) ?? null
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null
    }
    setColumns(prevState => {
      const activeItems = activeColumn.cards
      const overItems = overColumn.cards
      const activeIndex = activeItems.findIndex(i => i.id === activeId)
      const overIndex = overItems.findIndex(i => i.id === overId)
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0
        const modifier = putOnBelowLastItem ? 1 : 0
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }
      return prevState.map(c => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter(i => i.id !== activeId)
          return c
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ]
          return c
        } else {
          return c
        }
      })
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null
    }
    const activeIndex = activeColumn.cards.findIndex(i => i.id === activeId)
    const overIndex = overColumn.cards.findIndex(i => i.id === overId)
    if (activeIndex !== overIndex) {
      setColumns(prevState => {
        return prevState.map(column => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex)
            return column
          } else {
            return column
          }
        })
      })
    }
    // dispatch(updateLists(columns))
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div
        className='App'
        style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}
      >
        {columns.map(column => (
          <Column
            key={column.id}
            id={column.id}
            name={column.name}
            cards={column.cards}
          ></Column>
        ))}
      </div>
    </DndContext>
  )
}
