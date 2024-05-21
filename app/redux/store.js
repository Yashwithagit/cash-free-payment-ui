import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import userReducer from './product/productSlice'
import { authSlice } from './auth/authSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    auth: authSlice.reducer, 
    product:userReducer,// Use authSlice.reducer instead of just authSlice
  });
  // Persist config
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['auth'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializability check for complex state structures
      }),
  });
  

  
export const persistor=persistStore(store)