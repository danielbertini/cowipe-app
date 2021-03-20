import { combineReducers } from "redux";

import locationReducers from "./location/location.reducers";
import onlineReducers from "./online/online.reducers";
import preferencesReducers from "./preferences/preferences.reducers";
import activeRoomReducers from "./activeRoom/activeRoom.reducers";
import userReducers from "./user/user.reducers";
import ipReducers from "./ip/ip.reducers";

export default combineReducers({
  location: locationReducers,
  online: onlineReducers,
  preferences: preferencesReducers,
  activeRoom: activeRoomReducers,
  user: userReducers,
  ip: ipReducers,
});
