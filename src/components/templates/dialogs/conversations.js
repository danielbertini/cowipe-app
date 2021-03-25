import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { Tabs, Tab, Grid, Dialog, DialogContent } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";

import StoreContext from "../../../context/Context";
import SocketContext from "../../../context/SocketContext";
import api from "../../../services/api";
import Snackbar from "../../atoms/feedback/snackbar";
import Info from "../../atoms/display/info";
import LinearProgress from "../../atoms/feedback/linearProgress";
import AvatarConversation from "../../molecules/avatars/conversation";
import ProfileAbout from "../../organisms/profile/about";
import ProfilePictures from "../../organisms/profile/pictures";
import ProfileConversation from "../../organisms/profile/conversation";
import DialogTitle from "../dialogs/dialogTitle";

const Component = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { token } = useContext(StoreContext);
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [room, setRoom] = useState();
  const [connection, setConnection] = useState();
  const [currentUserId, setCurrentUserId] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getConversations = useCallback(() => {
    setLoading(true);
    api({ method: "GET", url: `connections/byUser` }).then((response) => {
      setLoading(false);
      if (response.data.success) {
        setConversations(response.data.connections);
      }
    });
  }, []);

  const matchUser = useCallback(
    (data) => {
      var userId = jwtDecode(token);
      if (data?.user?.[0]?._id === userId.id) {
        return data.targetUser[0];
      }
      if (data?.targetUser?.[0]?._id === userId.id) {
        return data.user[0];
      }
    },
    [token]
  );

  const renderConversations = () => {
    if (loading) {
      return (
        <>
          <DialogContent style={{ zIndex: 8 }}>
            <LinearProgress />
          </DialogContent>
        </>
      );
    } else {
      if (conversations?.length > 0) {
        return (
          <>
            <DialogContent style={{ zIndex: 8, padding: 0 }}>
              {conversations?.map((el) => {
                var user = matchUser(el);
                return (
                  <>
                    <AvatarConversation
                      counter={el.counter}
                      lastMessage={
                        el.lastMessage
                          ? el.lastMessage
                          : el.messages[0]?.message
                          ? el.messages[0]?.message
                          : ""
                      }
                      user={user}
                      loading={loadingProfile && user._id === currentUserId}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTabValue(0);
                        setCurrentUserId(user._id);
                        getProfile(user._id);
                      }}
                    />
                  </>
                );
              })}
            </DialogContent>
          </>
        );
      } else {
        return (
          <>
            <DialogContent style={{ zIndex: 8 }}>
              <Grid container direction="row" spacing={2}>
                <Info text={t("alerts.emptyConversationsInfo")} />
              </Grid>
            </DialogContent>
          </>
        );
      }
    }
  };

  const getProfile = useCallback(
    (userId) => {
      setLoadingProfile(true);
      api({ method: "GET", url: `user/profile/${userId}` })
        .then((response) => {
          if (response.data.success) {
            setLoadingProfile(false);
            setProfile(response.data.profile);
            setConnection(response.data.connection);
            if (response.data.room) {
              setRoom(response.data.room);
            }
          } else {
            if (response.data.blocked) {
              setSnackbarMessage(t("alerts.unavailableProfile"));
              setSnackbar(true);
              setTimeout(() => {
                props.open(false);
              }, 3000);
            } else {
              if (response.data.message) {
                setLoadingProfile(false);
                setSnackbarMessage(response.data.message);
                setSnackbar(true);
              }
            }
          }
        })
        .catch((error) => {
          setLoadingProfile(false);
          setSnackbarMessage(t("alerts.unavailableService"));
          setSnackbar(true);
          setTimeout(() => {
            props.open(false);
          }, 3000);
        });
    },
    [props, t]
  );

  const renderTabs = () => {
    if (!loading) {
      return (
        <>
          <div
            style={{
              backgroundColor: theme.palette.primary.main,
              zIndex: 9,
              boxShadow: theme.shadows[3],
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label={t("dialogs.profile.tab3.title")} />
              <Tab label={t("dialogs.profile.tab2.title")} />
              <Tab label={t("dialogs.profile.tab1.title")} />
            </Tabs>
          </div>
        </>
      );
    }
  };

  const renderTabContent = useCallback(() => {
    if (loading || !connection) {
      return (
        <>
          <DialogContent style={{ zIndex: 9 }}>
            <LinearProgress />
          </DialogContent>
        </>
      );
    } else {
      return (
        <>
          <ProfileConversation
            userId={profile._id}
            connection={connection}
            connectionUpdate={setConnection}
            room={room}
            roomUpdate={setRoom}
            display={tabValue === 0}
          />
          <ProfilePictures
            userId={profile._id}
            connection={connection}
            connectionUpdate={setConnection}
            roomUpdate={setRoom}
            display={tabValue === 1}
          />
          <ProfileAbout
            userId={profile._id}
            connection={connection}
            connectionUpdate={setConnection}
            roomUpdate={setRoom}
            profile={profile}
            display={tabValue === 2}
          />
        </>
      );
    }
  }, [connection, loading, profile, room, tabValue]);

  useEffect(() => {
    if (!room) {
      conversations?.map((el) => {
        socket.emit("rooms_join", el._id);
        socket.on("rooms_message", (data) => {
          setConversations(
            conversations.map((item) =>
              item._id === data.room
                ? {
                    ...item,
                    counter: item.counter ? parseInt(item.counter + 1) : 1,
                    lastMessage: data.message,
                  }
                : { ...item }
            )
          );
        });
        return null;
      });
      return () => {
        socket.off("rooms_message");
        conversations?.map((el) => {
          socket.emit("rooms_leave", el._id);
          return null;
        });
      };
    }
  }, [room, conversations, socket]);

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={room ? "sm" : "xs"}
        fullScreen={isMobile}
        open={props.open ? true : false}
        onClose={() => props.open(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          title={profile ? profile.username : t("dialogs.conversations.title")}
          user={profile ? profile : null}
          backButton={profile ? true : false}
          backButtonCallback={() => {
            getConversations();
            setProfile(false);
            setRoom();
          }}
          open={() => {
            props.open(false);
          }}
          style={{ zIndex: 9 }}
        />
        {!room && renderConversations()}
        {room && renderTabs()}
        {room && renderTabContent()}
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        autoHideDuration={3000}
        message={snackbarMessage}
      />
    </>
  );
};

export default memo(Component);
