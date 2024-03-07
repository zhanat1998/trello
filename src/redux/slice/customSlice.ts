import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { IModel } from '../../types';

const initialState: IModel[] = [];

export const createCustomSlice = (name: string) => {
  const {
    actions: { add, remove, reorder, update },
    reducer,
  } = createSlice({
    name,
    initialState,
    reducers: {
      add: {
        reducer: (state, action: PayloadAction<IModel>) => {
          state.push(action.payload);
        },
        prepare: (text: string) => ({
          payload: {
            id: uuidv4(),
            text,
            isFinished: false,
            isTextShowed: false,
          } as IModel,
        }),
      },
      update(state, action) {
        state.splice(
          action.payload.destination.index,
          0,
          action.payload.filterState
        );
      },
      remove(state, action: PayloadAction<string>) {
        const index = state.findIndex(({ id }) => id === action.payload);
        state.splice(index, 1);
      },
      reorder(state, action) {
        const [removed] = state.splice(action.payload.source.index, 1);
        state.splice(action.payload.destination.index, 0, removed);
      },
    },
  });

  return {
    actions: { add, remove, reorder, update },
    reducer,
  };
};
