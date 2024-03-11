import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { StoreState } from '../../redux/store'
import { doneSlice } from '../../redux/slice/done'
import { ColumnContainer } from '../../container/ColumnLayoutContainer'

export function DoneColumn() {
  const { done } = useSelector((state: StoreState) => state)
  const {
    actions: { remove, add, editText, editDescription, editImage, deleteImage },
  } = doneSlice

  return (
    <>
      <Typography mb={3}> done</Typography>
      <ColumnContainer
        droppableId='done'
        labelText='+ Add a card'
        removeHandler={remove}
        addHandler={add}
        selectorState={done}
        editTextHandler={editText}
        editAreaHandler={editDescription}
        editImageHandler={editImage}
        deleteImageHandler={deleteImage}
      />
    </>
  )
}
