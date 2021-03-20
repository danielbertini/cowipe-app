import React, {
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useTheme } from "@material-ui/core/styles";
import { SendRounded as SendIcon } from "@material-ui/icons";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { DialogActions, DialogContent } from "@material-ui/core";
import { useSelector } from "react-redux";

import api from "../../../services/api";
import StoreContext from "../../../context/Context";
import SocketContext from "../../../context/SocketContext";

import { setActiveRoom } from "../../../store/activeRoom/activeRoom.actions";

import Info from "../../atoms/display/info";
import TextField from "../../atoms/inputs/textfield";
import CircularProgress from "../../atoms/feedback/circularProgress";
import LinearProgress from "../../atoms/feedback/linearProgress";
import IconButton from "../../atoms/inputs/iconButton";
import BalloonMe from "../../molecules/ballons/balloonMe";
import BalloonOther from "../../molecules/ballons/balloonOther";
import ConnectButton from "./connectButton";
import ActionButton from "./actionButton";

const Component = (props) => {
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext);
  const { token } = useContext(StoreContext);
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState();
  const [conversation, setConversation] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const online = useSelector((state) => state.online);
  const theme = useTheme();
  const dispatch = useDispatch();
  const userId = jwtDecode(token);
  const inputMessageRef = useRef(30);

  const handleSendMessage = useCallback(() => {
    if (room && inputMessageRef.current.value) {
      socket.emit("rooms_message", {
        _from: userId.id,
        _to: props.userId,
        roomId: room,
        message: inputMessageRef.current.value,
      });
      inputMessageRef.current.value = "";
    } else {
      setSendingMessage(false);
    }
  }, [room, socket, userId.id, props.userId]);

  const handleLeaveRoom = useCallback(() => {
    if (room) {
      socket.emit("rooms_leave", room);
      dispatch(setActiveRoom(null));
    }
  }, [dispatch, room, socket]);

  const handleJoinRoom = useCallback(() => {
    if (room) {
      socket.emit("rooms_join", room);
      socket.on("rooms_message", (data) => {
        setSendingMessage(false);
        setConversation((conversation) => [data, ...conversation]);
        if (data._to === userId.id) {
          socket.emit("rooms_message_readed", data._id);
        }
      });
      dispatch(setActiveRoom(room));
    }
  }, [dispatch, room, socket, userId.id]);

  const getMessages = useCallback(() => {
    if (room) {
      setLoading(true);
      api({
        method: "POST",
        url: `user/messages`,
        data: { room: room },
      }).then((response) => {
        setLoading(false);
        if (response.data.success) {
          setConversation(response.data.result);
        }
      });
    }
  }, [room]);

  const renderConversation = () => {
    if (connection === 4) {
      if (conversation?.length > 0) {
        return (
          <>
            {conversation?.map((el) => {
              return (
                <>
                  {userId.id === el._from ? (
                    <BalloonMe data={el} />
                  ) : (
                    <BalloonOther data={el} />
                  )}
                </>
              );
            })}
          </>
        );
      } else {
        return (
          <>
            <Info text={t("alerts.chatStartInfo")} />
          </>
        );
      }
    } else {
      return (
        <>
          <Info text={t("alerts.justAfterConnecting")} />
        </>
      );
    }
  };

  useEffect(() => {
    setConnection(props.connection);
  }, [props.connection]);

  useEffect(() => {
    setRoom(props.room);
  }, [props.room]);

  useEffect(() => {
    props.room && handleJoinRoom();
    return () => {
      handleLeaveRoom();
    };
  }, [handleJoinRoom, handleLeaveRoom, props.room]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const renderComponent = () => {
    if (loading) {
      return (
        <>
          <DialogContent>
            <LinearProgress />
          </DialogContent>
        </>
      );
    } else {
      return (
        <>
          <DialogContent
            style={{
              display: "flex",
              flexDirection:
                connection === 4 && conversation?.length > 0
                  ? "column-reverse"
                  : "column",
            }}
          >
            {renderConversation()}
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              flexDirection: "columns",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {connection && (
                <ActionButton
                  userId={props.userId}
                  connection={connection}
                  connectionUpdate={(value) => {
                    props.connectionUpdate(value);
                    setConnection(value);
                  }}
                />
              )}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {connection === 4 && (
                <>
                  <div style={{ width: 5 }} />
                  <TextField
                    id="field-message"
                    label={t("fields.message.label")}
                    placeholder={t("fields.message.placeHolder")}
                    type="text"
                    color="secondary"
                    variant="outlined"
                    name="message"
                    multiline
                    rowsMax={6}
                    inputRef={inputMessageRef}
                    shrink={true}
                    fullWidth={true}
                  />
                  <div style={{ width: 10 }} />
                  <div>
                    <IconButton
                      onClick={() => {
                        setSendingMessage(true);
                        handleSendMessage();
                      }}
                      disabled={online ? false : true}
                    >
                      {!online || sendingMessage ? (
                        <CircularProgress
                          size={18}
                          style={{ color: theme.palette.text.primary }}
                        />
                      ) : (
                        <SendIcon />
                      )}
                    </IconButton>
                  </div>
                </>
              )}
              {connection && connection !== 4 && (
                <ConnectButton
                  userId={props.userId}
                  connection={connection}
                  roomUpdate={(value) => {
                    props.roomUpdate(value);
                    setRoom(value);
                  }}
                  connectionUpdate={(value) => {
                    props.connectionUpdate(value);
                    setConnection(value);
                  }}
                />
              )}
            </div>
          </DialogActions>
        </>
      );
    }
  };

  return props.display ? renderComponent() : <></>;
};

export default memo(Component);
