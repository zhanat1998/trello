import { configureStore, combineReducers } from '@reduxjs/toolkit'

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
import { shopSlice } from './shop/slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['shopReducer'],
}
const rootReducer = combineReducers({
  shopReducer: shopSlice.reducer,
})
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
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
