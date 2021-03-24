import React, { useState, useEffect, useRef } from "react";
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

import api from "../../../services/api";
import SelectField from "../../../components/atoms/inputs/selectfield";
import TextField from "../../../components/atoms/inputs/textfield";
import Snackbar from "../../atoms/feedback/snackbar";
import Typography from "../../atoms/display/typography";
import LinearProgress from "../../atoms/feedback/linearProgress";
import DialogTitle from "../dialogs/dialogTitle";

const Component = (props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [submiting, setSubmiting] = useState(false);
  const [commentsLenght, setCommentsLenght] = useState(0);
  const [commentsLenghtLimit] = useState(255);

  const inputComplaintTypeRef = useRef();
  const inputCommentsRef = useRef();

  useEffect(() => {
    api({ method: "GET", url: `commons/getComplaintTypes` })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setComplaintTypes(response.data.result);
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
        setTimeout(() => {
          props.handleClose(false);
        }, 3000);
      });
  }, [props, t]);

  const inputHandle = (event) => {
    event.persist();
    setForm((form) => ({
      ...form,
      [event?.target?.name]: event?.target?.value,
    }));
  };

  const handleSubmit = () => {
    setFormError({});
    setSubmiting(true);
    let form = {
      id: props.userId,
      complaintType: inputComplaintTypeRef.current.value,
      comments: inputCommentsRef.current.value,
    };
    api({
      method: "PUT",
      url: `connections/report`,
      data: form,
    })
      .then((response) => {
        setSubmiting(false);
        if (response.data.success) {
          setSnackbarMessage(t("alerts.savedInformations"));
          setSnackbar(true);
          setTimeout(() => {
            props.handleClose(false);
          }, 3000);
        } else {
          if (response.data.message) {
            setSnackbarMessage(response.data.message);
            setSnackbar(true);
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
        setSnackbarMessage(t("alerts.unavailableService"));
        setSnackbar(true);
        setTimeout(() => {
          props.handleClose(false);
        }, 3000);
      });
  };

  const observeCommentsField = () => {
    setCommentsLenght(inputCommentsRef.current.value.length);
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
                <Typography variant="body1" gutterBottom>
                  {t("dialogs.report.description")}
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.complaintTypes.label")}
                  placeholder={t("fields.complaintTypes.placeHolder")}
                  name="complaintType"
                  value={form.complaintType ? form.complaintType : ""}
                  onChange={inputHandle}
                  inputRef={inputComplaintTypeRef}
                  error={formError?.complaintType ? true : false}
                  helperText={
                    formError?.complaintType && formError.complaintType
                  }
                  data={complaintTypes}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="field-comments"
                  label={t("fields.comments.label")}
                  placeholder={t("fields.comments.placeHolder")}
                  type="comments"
                  color="secondary"
                  variant="outlined"
                  name="comments"
                  multiline
                  rows={6}
                  rowsMax={6}
                  onKeyUp={observeCommentsField}
                  inputRef={inputCommentsRef}
                  error={formError?.comments ? true : false}
                  helperText={formError?.comments && formError.comments}
                  shrink={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Chip
                  size="small"
                  label={`${commentsLenght} / ${commentsLenghtLimit}`}
                  color={
                    commentsLenght > commentsLenghtLimit
                      ? "secondary"
                      : "primary"
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
                loading || submiting || commentsLenght > commentsLenghtLimit
              }
            >
              {submiting ? (
                <CircularProgress size={25} color="secondary" />
              ) : (
                t("commons.report")
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
        onClose={() => props.handleClose(false)}
      >
        <DialogTitle
          title={t("dialogs.report.title")}
          open={() => props.handleClose(false)}
          style={{ zIndex: 9 }}
        />
        {renderContent()}
        {renderActions()}
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

export default Component;
