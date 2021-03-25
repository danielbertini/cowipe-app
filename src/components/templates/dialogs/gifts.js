import React, { memo, useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { useTheme } from "@material-ui/core/styles";
import { Dialog, DialogContent, Tabs, Tab } from "@material-ui/core";

import Snackbar from "../../atoms/feedback/snackbar";
import LinearProgress from "../../atoms/feedback/linearProgress";
import OrganismsGiftsSent from "../../organisms/gifts/sent";
import OrganismsGiftsReceived from "../../organisms/gifts/received";
import DialogTitle from "../dialogs/dialogTitle";

const TemplatesDialogsGifts = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [profile, setProfile] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [room, setRoom] = useState();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getProfile = useCallback(() => {
    // api({ method: "GET", url: `user/profile/${props.data._id}` })
    //   .then((response) => {
    //     if (response.data.success) {
    //       setLoading(false);
    //       setProfile(response.data.profile);
    //       setConnection(response.data.connection);
    //       if (response.data.room) {
    //         setRoom(response.data.room);
    //       }
    //     } else {
    //       if (response.data.blocked) {
    //         setSnackbarMessage(t("alerts.unavailableProfile"));
    //         setSnackbar(true);
    //         setTimeout(() => {
    //           props.open(false);
    //         }, 3000);
    //       } else {
    //         if (response.data.message) {
    //           setLoading(false);
    //           setSnackbarMessage(response.data.message);
    //           setSnackbar(true);
    //         }
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     setSnackbarMessage(t("alerts.unavailableService"));
    //     setSnackbar(true);
    //     setTimeout(() => {
    //       props.open(false);
    //     }, 3000);
    //   });
  }, [props, t]);

  const renderTabs = () => {
    return (
      <>
        <div
          style={{
            backgroundColor: theme.palette.primary.main,
            zIndex: 9,
            boxShadow: theme.shadows[3],
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label={t("dialogs.gifts.tab1.title")} />
            <Tab label={t("dialogs.gifts.tab2.title")} />
          </Tabs>
        </div>
      </>
    );
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
        open={props.open ? true : false}
        onClose={() => {
          props.open(false);
        }}
      >
        <DialogTitle
          title={t("dialogs.gifts.title")}
          style={{ zIndex: 9 }}
          open={() => {
            props.open(false);
          }}
        />
        {renderTabs()}
        <OrganismsGiftsSent display={tabValue === 0} />
        <OrganismsGiftsReceived display={tabValue === 1} />
      </Dialog>
      {snackbar && (
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
      )}
    </>
  );
};

export default memo(TemplatesDialogsGifts);
