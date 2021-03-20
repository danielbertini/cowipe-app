export default function activeRoomReducer(state = null, action) {
  switch (action.type) {
    case "SET_ACTIVE_ROOM":
      return action.payload;
    default:
      return state;
  }
}
