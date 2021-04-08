import React, { memo, useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@material-ui/core/styles";
import { Menu, MenuItem, CircularProgress } from "@material-ui/core";
import { MoreVertRounded as OptionsIcon } from "@material-ui/icons";
import { useSnackbar } from "notistack";

import api from "../../../services/api";
import IconButton from "../../atoms/inputs/iconButton";
import AlertDialog from "../../atoms/feedback/alertDialog";
import ReportDialog from "../../templates/dialogs/report";

const OrganismsProfileActionButton = (props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
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
            enqueueSnackbar(response.data.message, { variant: "success" });
          } else {
            enqueueSnackbar(t("alerts.blocked"), { variant: "info" });
          }
        } else {
          enqueueSnackbar(response.data.message, { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
      });
  }, [enqueueSnackbar, props, t]);

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
          enqueueSnackbar(t("alerts.disconnected"), { variant: "success" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
      });
  }, [enqueueSnackbar, props, t]);

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
    </>
  );
};

export default memo(OrganismsProfileActionButton);
