import { createStore } from "redux";

import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState({
    location: store.getState().location,
    online: store.getState().online,
    preferences: store.getState().preferences,
    activeRoom: store.getState().activeRoom,
    user: store.getState().user,
    ip: store.getState().ip,
  });
});

export default store;
