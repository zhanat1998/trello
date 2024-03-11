import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { StoreState } from '../../redux/store'
import { ColumnContainer } from '../../container/ColumnLayoutContainer'
import { discussionSlice } from '../../redux/slice/discussion'

export function DiscussionColumn() {
  const { discussion } = useSelector((state: StoreState) => state)
  const {
    actions: { remove, add, editText, editDescription, editImage, deleteImage },
  } = discussionSlice

  return (
    <>
      <Typography mb={3}>discussion</Typography>
      <ColumnContainer
        droppableId='discussion'
        labelText='+ Add a card'
        removeHandler={remove}
        addHandler={add}
        selectorState={discussion}
        editTextHandler={editText}
        editAreaHandler={editDescription}
        editImageHandler={editImage}
        deleteImageHandler={deleteImage}
      />
    </>
  )
}
