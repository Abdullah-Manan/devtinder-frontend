import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineSlices({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);

  return { store, persistor };
};

export const { store, persistor } = makeStore();

export const AppDispatch = store.dispatch;
export const AppThunk = store.thunk;
