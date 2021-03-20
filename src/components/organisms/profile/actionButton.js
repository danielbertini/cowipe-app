import React, { memo, useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@material-ui/core/styles";
import { Menu, MenuItem, CircularProgress } from "@material-ui/core";
import { MoreVertRounded as OptionsIcon } from "@material-ui/icons";

import api from "../../../services/api";
import Snackbar from "../../atoms/feedback/snackbar";
import IconButton from "../../atoms/inputs/iconButton";
import AlertDialog from "../../atoms/feedback/alertDialog";
import ReportDialog from "../../templates/dialogs/report";

const Component = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [blocking, setBlocking] = useState(false);
  const [connection, setConnection] = useState();
  const [disconnecting, setDisconnecting] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [disconnectAlertDialog, setDisconnectAlertDialog] = useState(false);
  const [blockAlertDialog, setBlockAlertDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickOptionsMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorEl(null);
  };

  const handleBlock = useCallback(() => {
    setBlocking(true);
    api({
      method: "PUT",
      url: `connections/block`,
      data: {
        id: props.userId,
      },
    })
      .then((response) => {
        setBlocking(false);
        if (response.data.success) {
          setConnection(1);
          props.connectionUpdate(1);
          if (response.data.message) {
            setSnackbarMessage(response.data.message);
            setSnackbar(true);
          } else {
            setSnackbarMessage(t("alerts.blocked"));
            setSnackbar(true);
          }
        } else {
          setSnackbarMessage(response.data.message);
          setSnackbar(true);
        }
      })
      .catch((error) => {
        setSnackbarMessage(t("alerts.unavailableService"));
        setSnackbar(true);
      });
  }, [props, t]);

  const handleDisconnect = useCallback(() => {
    setDisconnecting(true);
    api({
      method: "DELETE",
      url: `connections/delete`,
      data: {
        id: props.userId,
      },
    })
      .then((response) => {
        setDisconnecting(false);
        if (response.data.success) {
          setConnection(1);
          props.connectionUpdate(1);
          setSnackbarMessage(t("alerts.disconnected"));
          setSnackbar(true);
        }
      })
      .catch((error) => {
        setSnackbarMessage(t("alerts.unavailableService"));
        setSnackbar(true);
      });
  }, [props, t]);

  const renderMenu = () => {
    return (
      <>
        <IconButton onClick={handleClickOptionsMenu}>
          {disconnecting || blocking ? (
            <CircularProgress
              size={18}
              style={{ color: theme.palette.text.primary }}
            />
          ) : (
            <OptionsIcon />
          )}
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleCloseOptionsMenu}
        >
          <MenuItem
            key={1}
            onClick={() => {
              handleCloseOptionsMenu();
              setReportDialogOpen(true);
            }}
          >
            {t("commons.report")}
          </MenuItem>
          <MenuItem
            key={2}
            onClick={() => {
              handleCloseOptionsMenu();
              setBlockAlertDialog(true);
            }}
          >
            {t("commons.block")}
          </MenuItem>
          <MenuItem
            key={3}
            disabled={connection === 4 ? false : true}
            onClick={() => {
              handleCloseOptionsMenu();
              setDisconnectAlertDialog(true);
            }}
          >
            {t("commons.disconnect")}
          </MenuItem>
        </Menu>
      </>
    );
  };

  useEffect(() => {
    setConnection(props.connection);
  }, [props.connection]);

  return (
    <>
      {renderMenu()}
      {blockAlertDialog && (
        <AlertDialog
          open={blockAlertDialog}
          title={t("commons.warning")}
          text={t("alerts.block")}
          handleClose={setBlockAlertDialog}
          handleAgree={handleBlock}
        />
      )}
      {reportDialogOpen && (
        <ReportDialog
          userId={props.userId}
          open={reportDialogOpen}
          handleClose={setReportDialogOpen}
        />
      )}
      {disconnectAlertDialog && (
        <AlertDialog
          open={disconnectAlertDialog}
          title={t("commons.warning")}
          text={t("alerts.disconnect")}
          handleClose={setDisconnectAlertDialog}
          handleAgree={handleDisconnect}
        />
      )}
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

export default memo(Component);
