import React, { memo, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { DialogActions, DialogContent } from "@material-ui/core";

import api from "../../../services/api";
import Info from "../../atoms/display/info";
import Snackbar from "../../atoms/feedback/snackbar";
import LinearProgress from "../../atoms/feedback/linearProgress";

const OrganismsGiftsSent = (props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const getData = useCallback(() => {
    api({ method: "POST", url: `gifts/getSent` })
      .then((response) => {
        if (response.data.success) {
          setLoading(false);
          setData(response.data.result);
        } else {
          if (response.data.blocked) {
            setSnackbarMessage(t("alerts.unavailableProfile"));
            setSnackbar(true);
          } else {
            if (response.data.message) {
              setLoading(false);
              setSnackbarMessage(response.data.message);
              setSnackbar(true);
            }
          }
        }
      })
      .catch((error) => {
        setSnackbarMessage(t("alerts.unavailableService"));
        setSnackbar(true);
      });
  }, [t]);

  useEffect(() => {
    getData();
  }, [getData]);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LinearProgress />
        </>
      );
    } else {
      if (data.length > 0) {
      } else {
        return (
          <>
            <Info text={t("alerts.noGiftsSent")} />
          </>
        );
      }
    }
  };

  const renderComponent = () => {
    return (
      <>
        <DialogContent>{renderContent()}</DialogContent>
        {/* <DialogActions
          style={{
            display: "flex",
            flexDirection: "columns",
            justifyContent: "space-between",
          }}
        ></DialogActions> */}
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

  return props.display ? renderComponent() : <></>;
};

export default memo(OrganismsGiftsSent);
