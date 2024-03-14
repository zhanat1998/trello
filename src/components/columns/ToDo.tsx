import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { StoreState } from '../../redux/store'
import { todoSlice } from '../../redux/slice/todo'
import { ColumnContainer } from '../../container/ColumnLayoutContainer'

export function ToDoColumn() {
  const { todo } = useSelector((state: StoreState) => state)
  console.log('todo: ', todo)
  const {
    actions: { remove, add, editText, editDescription, editImage, deleteImage },
  } = todoSlice

  return (
    <>
      <Typography mb={3}> todo</Typography>
      <ColumnContainer
        droppableId='todo'
        labelText='+ Add a card'
        removeHandler={remove}
        addHandler={add}
        selectorState={todo}
        editTextHandler={editText}
        editAreaHandler={editDescription}
        editImageHandler={editImage}
        deleteImageHandler={deleteImage}
      />
    </>
  )
}
