import React, { memo, useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { useTheme } from "@material-ui/core/styles";
import { Dialog, DialogContent, Tabs, Tab } from "@material-ui/core";
import { useSnackbar } from "notistack";

import api from "../../../services/api";
import LinearProgress from "../../atoms/feedback/linearProgress";
import ProfileAbout from "../../organisms/profile/about";
import ProfilePictures from "../../organisms/profile/pictures";
import ProfileConversation from "../../organisms/profile/conversation";
import DialogTitle from "../dialogs/dialogTitle";

const Component = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState();
  const [profile, setProfile] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [room, setRoom] = useState();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getProfile = useCallback(() => {
    api({ method: "GET", url: `user/profile/${props.data._id}` })
      .then((response) => {
        if (response.data.success) {
          setLoading(false);
          setProfile(response.data.profile);
          setConnection(response.data.connection);
          if (response.data.room) {
            setRoom(response.data.room);
          }
        } else {
          if (response.data.blocked) {
            enqueueSnackbar(t("alerts.unavailableProfile"), {
              variant: "error",
            });
            setTimeout(() => {
              props.open(false);
            }, 3000);
          } else {
            if (response.data.message) {
              enqueueSnackbar(response.data.message, { variant: "error" });
              setLoading(false);
            }
          }
        }
      })
      .catch((error) => {
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
        setTimeout(() => {
          props.open(false);
        }, 3000);
      });
  }, [enqueueSnackbar, props, t]);

  const renderContent = useCallback(() => {
    if (loading || !connection) {
      return (
        <>
          <DialogContent style={{ zIndex: 8 }}>
            <LinearProgress />
          </DialogContent>
        </>
      );
    } else {
      return (
        <>
          <ProfileAbout
            userId={props.data._id}
            connection={connection}
            connectionUpdate={setConnection}
            roomUpdate={setRoom}
            profile={profile}
            display={tabValue === 0}
          />
          <ProfilePictures
            userId={props.data._id}
            connection={connection}
            connectionUpdate={setConnection}
            roomUpdate={setRoom}
            display={tabValue === 1}
          />
          <ProfileConversation
            userId={props.data._id}
            connection={connection}
            connectionUpdate={setConnection}
            room={room}
            roomUpdate={setRoom}
            display={tabValue === 2}
          />
        </>
      );
    }
  }, [connection, loading, profile, props.data._id, room, tabValue]);

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
              <Tab label={t("dialogs.profile.tab1.title")} />
              <Tab label={t("dialogs.profile.tab2.title")} />
              <Tab label={t("dialogs.profile.tab3.title")} />
            </Tabs>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
        open={props.open ? true : false}
        onClose={() => {
          props.open(false);
        }}
      >
        <DialogTitle
          title={profile?.username ? profile.username : t("commons.profile")}
          user={profile}
          style={{ zIndex: 9 }}
          open={() => {
            props.open(false);
          }}
        />
        {renderTabs()}
        {renderContent()}
      </Dialog>
    </>
  );
};

export default memo(Component);
