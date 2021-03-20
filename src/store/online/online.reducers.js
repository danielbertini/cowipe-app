export default function onlineReducer(state = null, action) {
  switch (action.type) {
    case "SET_ONLINE":
      return action.payload;
    default:
      return state;
  }
}
