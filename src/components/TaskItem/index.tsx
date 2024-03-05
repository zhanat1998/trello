import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FC } from 'react'

type ITaskItem = {
  title: string
}

export const TaskItem: FC<ITaskItem> = props => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.title })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.title}
    </li>
  )
}
