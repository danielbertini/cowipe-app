import React, { memo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FormControlLabel, Switch, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import api from "../../../services/api";
import Picture from "../../atoms/display/picture";
import Snackbar from "../../atoms/feedback/snackbar";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
  }));

  const { t } = useTranslation();
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRestrictedChange = useCallback(
    (event) => {
      props.restrictedChange(props.data._id, event.target.checked);
      api({
        method: "PUT",
        url: `pictures/restricted`,
        data: {
          pictureId: props.data._id,
          restricted: event.target.checked,
        },
      })
        .then((response) => {
          if (response.data.success) {
          } else {
            if (response.data.message) {
              setSnackbarMessage(response.data.message);
              setSnackbar(true);
            }
          }
        })
        .catch((error) => {
          setSnackbarMessage(t("alerts.unavailableService"));
          setSnackbar(true);
        });
    },
    [props, t]
  );

  const handleSelectedChange = useCallback(() => {
    props.selectedChange(props.data._id, props.data.selected ? false : true);
    api({
      method: "PUT",
      url: `pictures/selected`,
      data: {
        pictureId: props.data._id,
        selected: props.data.selected ? false : true,
      },
    })
      .then((response) => {
        if (response.data.success) {
        } else {
          if (response.data.message) {
            setSnackbarMessage(response.data.message);
            setSnackbar(true);
          }
        }
      })
      .catch((error) => {
        setSnackbarMessage(t("alerts.unavailableService"));
        setSnackbar(true);
      });
  }, [props, t]);

  const renderItem = useCallback(() => {
    return (
      <>
        <FormControlLabel
          control={
            <Switch
              checked={props.data.restricted}
              onChange={(event) => handleRestrictedChange(event)}
            />
          }
          label={t("commons.restricted")}
        />
      </>
    );
  }, [handleRestrictedChange, props.data.restricted, t]);

  return (
    <>
      <div className={classes.root}>
        <CardActionArea onClick={() => handleSelectedChange()}>
          <Picture
            src={`${process.env.REACT_APP_CDN}/pictures/${props.data._user}/${props.data.filename}-small`}
            width={`100%`}
            height={120}
            radius
            selected={props.data.selected}
          />
        </CardActionArea>
        <div style={{ width: "100%", marginTop: 5 }}>{renderItem()}</div>
      </div>
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
