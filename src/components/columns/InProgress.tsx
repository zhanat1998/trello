import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { StoreState } from '../../redux/store'
import { inProgressSlice } from '../../redux/slice/inProgress'
import { ColumnContainer } from '../../container/ColumnLayoutContainer'

export function InProgressColumn() {
  const { inProgress } = useSelector((state: StoreState) => state)

  console.log('inProgress: ', inProgress)

  const {
    actions: { remove, add, editText, editDescription, editImage, deleteImage },
  } = inProgressSlice

  return (
    <>
      <Typography mb={3}>inProgress</Typography>
      <ColumnContainer
        droppableId='inProgress'
        labelText='+ Add a card'
        removeHandler={remove}
        addHandler={add}
        selectorState={inProgress}
        editTextHandler={editText}
        editAreaHandler={editDescription}
        editImageHandler={editImage}
        deleteImageHandler={deleteImage}
      />
    </>
  )
}
