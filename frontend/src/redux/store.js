import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice.js';
import listingReducer from './reducers/ListingSlice.js';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  listing:listingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persist = persistStore(store);
export default store;
