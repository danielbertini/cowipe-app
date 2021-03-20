import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";

import api from "../../../services/api";
import SelectField from "../../../components/atoms/inputs/selectfield";
import Snackbar from "../../atoms/feedback/snackbar";
import LinearProgress from "../../atoms/feedback/linearProgress";
import DialogTitle from "../dialogs/dialogTitle";

const Component = (props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [preLoading, setPreLoading] = useState(true);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [genders, setGenders] = useState([]);
  const [orientationTypes, setOrientationTypes] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [relationshipTypes, setRelationshipTypes] = useState([]);
  const [sugarTypes, setSugarTypes] = useState([]);

  useEffect(() => {
    api({ method: "GET", url: `user/relationship` })
      .then((response) => {
        setPreLoading(false);
        if (response.data.success) {
          setGenders(response.data.data.genders);
          setOrientationTypes(response.data.data.orientationTypes);
          setRelationshipTypes(response.data.data.relationshipTypes);
          setMaritalStatus(response.data.data.maritalStatus);
          setSugarTypes(response.data.data.sugarTypes);
          setForm({
            gender: response.data.data.userRelationship[0].relationship._gender,
            orientation:
              response.data.data.userRelationship[0].relationship._orientation,
            relationship:
              response.data.data.userRelationship[0].relationship._relationship,
            maritalStatus:
              response.data.data.userRelationship[0].relationship
                ._maritalStatus,
            sugar: response.data.data.userRelationship[0].relationship._sugar,
          });
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
          props.open(false);
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
    setLoading(true);
    api({
      method: "PUT",
      url: `user/relationship`,
      data: form,
    })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setSnackbarMessage(t("alerts.savedInformations"));
          setSnackbar(true);
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
          props.open(false);
        }, 3000);
      });
  };

  const renderSugarTypes = () => {
    if (form.relationship === "5fa9eb3a201036a4efa3f271") {
      return (
        <>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <SelectField
              label={t("fields.sugar.label")}
              placeholder={t("fields.sugar.placeHolder")}
              name="sugar"
              value={form.sugar ? form.sugar : ""}
              error={formError?.sugar ? true : false}
              helperText={formError?.sugar && formError.sugar}
              onChange={inputHandle}
              data={sugarTypes}
            />
          </Grid>
        </>
      );
    }
  };

  const renderContent = () => {
    if (preLoading) {
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
                <SelectField
                  label={t("fields.gender.label")}
                  placeholder={t("fields.gender.placeHolder")}
                  name="gender"
                  value={form.gender ? form.gender : ""}
                  error={formError?.gender ? true : false}
                  helperText={formError?.gender && formError.gender}
                  onChange={inputHandle}
                  hideItem={"5faedb304f858c44b5af453b"}
                  data={genders}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.orientation.label")}
                  placeholder={t("fields.orientation.placeHolder")}
                  name="orientation"
                  value={form.orientation ? form.orientation : ""}
                  error={formError?.orientation ? true : false}
                  helperText={formError?.orientation && formError.orientation}
                  onChange={inputHandle}
                  data={orientationTypes}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.maritalStatus.label")}
                  placeholder={t("fields.maritalStatus.placeHolder")}
                  name="maritalStatus"
                  value={form.maritalStatus ? form.maritalStatus : ""}
                  error={formError?.maritalStatus ? true : false}
                  helperText={
                    formError?.maritalStatus && formError.maritalStatus
                  }
                  onChange={inputHandle}
                  data={maritalStatus}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.relationship.label")}
                  placeholder={t("fields.relationship.placeHolder")}
                  name="relationship"
                  value={form.relationship ? form.relationship : ""}
                  error={formError?.relationship ? true : false}
                  helperText={formError?.relationship && formError.relationship}
                  onChange={inputHandle}
                  data={relationshipTypes}
                />
              </Grid>
              {renderSugarTypes()}
            </Grid>
          </DialogContent>
        </>
      );
    }
  };

  const renderActions = () => {
    if (!preLoading) {
      return (
        <>
          <DialogActions>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => handleSubmit()}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={25} color="secondary" />
              ) : (
                t("buttons.change")
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
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          title={t("commons.relationship")}
          open={() => props.open(false)}
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
