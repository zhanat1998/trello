import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store';
import ColumnLayout from '../ColumnLayout';
import { discussionSlice } from '../../redux/slice/discussion';

export function DiscussionColumn() {
  const { discussion } = useSelector((state: StoreState) => state);
  const {
    actions: { remove, add },
  } = discussionSlice;

  return (
    <>
      <Typography mb={3}>All discussion tasks: {discussion.length}</Typography>
      <ColumnLayout
        droppableId='discussion'
        labelText="add card"
        removeHandler={remove}
        addHandler={add}
        selectorState={discussion}
      />
    </>
  );
}
