import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import notesReducer from "features/notes/notesSlice";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  notes: notesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger: Middleware<{}, any> = (storeAPI) => (next) => (action) => {
  console.info("dispatching", action);
  let result = next(action);
  console.info("next state", storeAPI.getState());
  return result;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
