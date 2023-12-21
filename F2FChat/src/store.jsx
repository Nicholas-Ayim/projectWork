import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk"; // Import redux-thunk as default
// import logger from "redux-logger";
import chatApi from "./services/chatApi";
import contactReducer from "./features/chatSlice";

// Persisting the reducer
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducer = combineReducers({
  contacts: contactReducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

// Configure the store and blacklist

const persistConfig = {
  key: "root",
  storage,
  blacklist: [chatApi.reducerPath],
};

// Persist the store
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
    immutableCheck:false,
    serializableCheck: false,
  }), chatApi.middleware]});

export default store;
