export default function ipReducer(state = null, action) {
  switch (action.type) {
    case "SET_IP":
      return action.payload;
    default:
      return state;
  }
}
