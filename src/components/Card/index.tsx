import { FC } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
export type CardType = {
  title: string
  id: string
  description: string
  image: string | null
}

const Card: FC<CardType> = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  })

  const style = {
    margin: '10px',
    opacity: 1,
    color: '#333',
    background: 'white',
    padding: '10px',
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div id={id} key={id}>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default Card
