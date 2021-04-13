import React, { useState, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  CircularProgress,
  Chip,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import api from "../../../services/api";
import TextField from "../../../components/atoms/inputs/textfield";
import LinearProgress from "../../atoms/feedback/linearProgress";
import DialogTitle from "../dialogs/dialogTitle";

const TemplatesDialogsTalkWithUs = (props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [loading] = useState(false);
  const [formError, setFormError] = useState({});
  const [submiting, setSubmiting] = useState(false);
  const [messageLenght, setMessageLenght] = useState(0);
  const [messageLenghtLimit] = useState(500);

  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputMessageRef = useRef();

  const handleSubmit = () => {
    setFormError({});
    setSubmiting(true);
    let form = {
      name: inputNameRef.current.value,
      email: inputEmailRef.current.value,
      message: inputMessageRef.current.value,
    };
    api({
      method: "POST",
      url: `about/talkWithUs`,
      data: form,
    })
      .then((response) => {
        setSubmiting(false);
        if (response.data.success) {
          enqueueSnackbar(t("alerts.messageSent"), {
            variant: "success",
          });
          setTimeout(() => {
            props.open(false);
          }, 3000);
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, { variant: "error" });
          }
          if (response.data.errors) {
            Object.keys(response.data.errors).map((e) => {
              return setFormError((formError) => ({
                ...formError,
                [e]: response.data.errors[e],
              }));
            });
          }
        }
      })
      .catch((error) => {
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
        setTimeout(() => {
          props.open(false);
        }, 3000);
      });
  };

  const observeMessageField = () => {
    setMessageLenght(inputMessageRef.current.value.length);
  };

  const renderContent = () => {
    if (loading) {
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
          <DialogContent style={{ zIndex: 8 }}>
            <Grid container direction="row" spacing={2} justify="center">
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="field-name"
                  label={t("fields.name.label")}
                  placeholder={t("fields.name.placeHolder")}
                  type="text"
                  color="secondary"
                  variant="outlined"
                  name="name"
                  inputRef={inputNameRef}
                  error={formError?.name ? true : false}
                  helperText={formError?.name && formError.name}
                  shrink={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="field-email"
                  label={t("fields.email.label")}
                  placeholder={t("fields.email.placeHolder")}
                  type="email"
                  color="secondary"
                  variant="outlined"
                  name="email"
                  inputRef={inputEmailRef}
                  error={formError?.email ? true : false}
                  helperText={formError?.email && formError.email}
                  shrink={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="field-message"
                  label={t("fields.message.label")}
                  placeholder={t("fields.message.placeHolder")}
                  type="text"
                  color="secondary"
                  variant="outlined"
                  name="message"
                  multiline
                  rows={6}
                  rowsMax={6}
                  onKeyUp={observeMessageField}
                  inputRef={inputMessageRef}
                  error={formError?.message ? true : false}
                  helperText={formError?.message && formError.message}
                  shrink={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Chip
                  size="small"
                  label={`${messageLenght} / ${messageLenghtLimit}`}
                  color={
                    messageLenght > messageLenghtLimit ? "secondary" : "primary"
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
        </>
      );
    }
  };

  const renderActions = () => {
    if (!loading) {
      return (
        <>
          <DialogActions>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => handleSubmit()}
              disabled={
                loading || submiting || messageLenght > messageLenghtLimit
              }
            >
              {submiting ? (
                <CircularProgress size={25} color="secondary" />
              ) : (
                t("buttons.send")
              )}
            </Button>
          </DialogActions>
        </>
      );
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
        open={props.open ? true : false}
        onClose={() => props.open(false)}
      >
        <DialogTitle
          title={t("dialogs.talkWithUs.title")}
          open={() => props.open(false)}
          style={{ zIndex: 9 }}
        />
        {renderContent()}
        {renderActions()}
      </Dialog>
    </>
  );
};

export default memo(TemplatesDialogsTalkWithUs);
