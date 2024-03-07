import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store';
import { doneSlice } from '../../redux/slice/done';
import ColumnLayout from '../ColumnLayout';

export function DoneColumn() {
  const { done } = useSelector((state: StoreState) => state);
  const {
    actions: { remove, add },
  } = doneSlice;

  return (
    <>
      <Typography mb={3}>All done tasks: {done.length}</Typography>
      <ColumnLayout
        droppableId='done'
        labelText="add card"
        removeHandler={remove}
        addHandler={add}
        selectorState={done}
      />
    </>
  );
}
