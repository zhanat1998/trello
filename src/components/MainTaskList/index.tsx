import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { TaskList } from '../TaskList'
import '../MainTaskList/MainTaskList.scss'
import { useAppSelector } from '../../hook'

type ITaskList = { [key: string]: string[] }

export const MainTaskList = () => {
  const Lists = useAppSelector(state => state.shopReducer.lists)
  const [taskList, setTaskList] = useState<ITaskList>({})
  console.log(Lists, 'listtssss')
  useEffect(() => {
    console.log(Lists, 'lists')
    if (Lists) {
      const convertedTaskList: ITaskList = {}
      Lists.forEach(list => {
        convertedTaskList[list.id] = list.todos.map(todo => todo.title)
      })
      setTaskList(convertedTaskList)
    }
  }, [Lists])

  const dragEndHandler = (e: DragEndEvent) => {
    if (!e.over || !e.active.data.current || !e.over.data.current) return
    if (e.active.id === e.over.id) return
    if (
      e.active.data.current.sortable.containerId !==
      e.over.data.current.sortable.containerId
    )
      return
    const containerName = e.active.data.current.sortable.containerId

    setTaskList(taskList => {
      const temp = { ...taskList }
      if (!e.over) return temp
      const oldIdx = temp[containerName].indexOf(e.active.id.toString())
      const newIdx = temp[containerName].indexOf(e.over.id.toString())
      temp[containerName] = arrayMove(temp[containerName], oldIdx, newIdx)
      return temp
    })
  }
  const dragOverHandler = (e: DragOverEvent) => {
    if (!e.over) return
    const initialContainer = e.active.data.current?.sortable?.containerId
    const targetContainer = e.over.data.current?.sortable?.containerId
    if (!initialContainer) return
    setTaskList(taskList => {
      const temp = { ...taskList }
      if (!targetContainer) {
        if (taskList[e.over!.id].includes(e.active.id.toString())) return temp
        temp[initialContainer] = temp[initialContainer].filter(
          task => task !== e.active.id.toString(),
        )
        temp[e.over!.id].push(e.active.id.toString())
        return temp
      }
      if (initialContainer === targetContainer) {
        const oldIdx = temp[initialContainer].indexOf(e.active.id.toString())
        const newIdx = temp[initialContainer].indexOf(e.over!.id.toString())
        temp[initialContainer] = arrayMove(
          temp[initialContainer],
          oldIdx,
          newIdx,
        )
      } else {
        temp[initialContainer] = temp[initialContainer].filter(
          task => task !== e.active.id.toString(),
        )
        const newIdx = temp[targetContainer].indexOf(e.over!.id.toString())
        temp[targetContainer].splice(newIdx, 0, e.active.id.toString())
      }
      return temp
    })
  }
  return (
    <DndContext onDragEnd={dragEndHandler} onDragOver={dragOverHandler}>
      <main>
        <h1>Multi sortable List</h1>
        <section className='container'>
          {Object.keys(taskList).map(key => (
            <TaskList key={key} name={key} id={key} tasks={taskList[key]} />
          ))}
        </section>
      </main>
    </DndContext>
  )
}
