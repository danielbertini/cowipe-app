import api from "../../services/api";

const INITIAL_STATE = {
  sound: true,
  visibility: true,
  reserved: false,
};
export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_PREFERENCES":
      if (api.defaults.headers.common["Authorization"]) {
        api.put("user/preferences", {
          sound: action.payload.sound,
          visibility: action.payload.visibility,
          reserved: action.payload.reserved,
        });
      }
      return action.payload;
    default:
      return state;
  }
}
