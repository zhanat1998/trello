import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { doneSlice } from '../slice/done';
import { inProgressSlice } from '../slice/inProgress';
import { todoSlice } from '../slice/todo';
import { discussionSlice } from '../slice/discussion';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['done', 'inProgress', 'todo', 'discussion'],
};
const rootReducer = combineReducers({
    done: doneSlice.reducer,
    inProgress: inProgressSlice.reducer,
    todo: todoSlice.reducer,
    discussion: discussionSlice.reducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)
export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
