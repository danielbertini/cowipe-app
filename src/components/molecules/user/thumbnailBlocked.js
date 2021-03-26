import React, { memo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";

import api from "../../../services/api";
import Picture from "../../atoms/display/picture";
import Typography from "../../atoms/display/typography";
import Button from "../../atoms/inputs/button";
import CircularProgress from "../../atoms/feedback/circularProgress";
import AlertDialog from "../../atoms/feedback/alertDialog";
import Thumbnail from "./thumbnail";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
      overflow: "hidden",
    },
    content: {
      margin: 15,
      marginTop: 10,
      marginBottom: 10,
      "& > *": {
        overflow: "hidden",
        maxWidth: "100%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    status: {
      position: "relative",
      backgroundColor: theme.palette.status[0],
      marginTop: -22,
      top: 11,
      float: "right",
      right: 15,
      width: 22,
      height: 22,
      borderRadius: 11,
      border: `3px solid ${theme.palette.primary.main}`,
    },
    buttonArea: {
      padding: 15,
    },
  }));

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [blocked, setBlocked] = useState(true);
  const [unblocking, setUnblocking] = useState(false);
  const [unblockAlertDialog, setUnblockAlertDialog] = useState(false);

  const handleUnblock = useCallback(() => {
    setUnblocking(true);
    api({
      method: "DELETE",
      url: `connections/unblock`,
      data: {
        id: props.id,
      },
    })
      .then((response) => {
        setUnblocking(false);
        if (response.data.success) {
          setBlocked(false);
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, {
              variant: "error",
            });
          }
        }
      })
      .catch((error) => {
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
      });
  }, [enqueueSnackbar, props.id, t]);

  const parsePicture = () => {
    if (props.data.picture) {
      return `${process.env.REACT_APP_CDN}/pictures/profiles/${props.data.picture}`;
    } else {
      return "";
    }
  };

  const renderThumbnail = () => {
    if (blocked) {
      return (
        <>
          <div className={classes.root}>
            <Picture width="100%" height={150} src={parsePicture()} />
            <div className={classes.content}>
              <Typography variant="body1">
                {props.data.username},{" "}
                {moment().diff(props.data.birthday, "years")}
              </Typography>
            </div>
            <Divider />
            <div className={classes.buttonArea}>
              <Button
                size="large"
                variant="outlined"
                fullWidth
                color="secondary"
                disabled={unblocking}
                onClick={() => setUnblockAlertDialog(true)}
              >
                {unblocking ? (
                  <CircularProgress size={25} color="secondary" />
                ) : (
                  t("buttons.unlock")
                )}
              </Button>
            </div>
          </div>
          {unblockAlertDialog && (
            <AlertDialog
              open={unblockAlertDialog}
              title={t("commons.warning")}
              text={t("alerts.unblock", { username: props.data.username })}
              handleClose={setUnblockAlertDialog}
              handleAgree={handleUnblock}
            />
          )}
        </>
      );
    } else {
      return (
        <>
          <Thumbnail data={props.data} />
        </>
      );
    }
  };

  return renderThumbnail();
};

export default memo(Component);
