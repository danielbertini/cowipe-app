import React, { useState, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import NumberFormat from "react-number-format";
import { useSnackbar } from "notistack";

import api from "../../../services/api";
import SelectField from "../../../components/atoms/inputs/selectfield";
import TextField from "../../../components/atoms/inputs/textfield";
import LinearProgress from "../../atoms/feedback/linearProgress";
import DialogTitle from "../dialogs/dialogTitle";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";

const TemplatesDialogsAppearance = (props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [preLoading, setPreLoading] = useState(true);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [bodyTypes, setBodyTypes] = useState([]);
  const [hairColors, setHairColors] = useState([]);
  const [eyeColors, setEyeColors] = useState([]);

  useEffect(() => {
    api({ method: "GET", url: `user/appearance` })
      .then((response) => {
        setPreLoading(false);
        if (response.data.success) {
          setBodyTypes(response.data.data.bodyTypes);
          setHairColors(response.data.data.hairColors);
          setEyeColors(response.data.data.eyeColors);
          setForm({
            height: response.data.data.user[0].appearance.height,
            weight: response.data.data.user[0].appearance.weight,
            bodyType: response.data.data.user[0].appearance._bodyType,
            hairColor: response.data.data.user[0].appearance._hairColor,
            eyeColor: response.data.data.user[0].appearance._eyeColor,
          });
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, { variant: "error" });
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

  const inputHandle = (event) => {
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
      url: `user/appearance`,
      data: form,
    })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          enqueueSnackbar(t("alerts.savedInformations"), {
            variant: "success",
          });
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
                <NumberFormat
                  id="field-height"
                  label={t("fields.height.label")}
                  placeholder={t("fields.height.placeHolder")}
                  variant="outlined"
                  color="secondary"
                  type="tel"
                  name="height"
                  value={form.height ? form.height : ""}
                  onChange={inputHandle}
                  customInput={TextField}
                  format="### cm"
                  mask=""
                  shrink={true}
                  fullWidth={true}
                  error={formError?.height ? true : false}
                  helperText={formError?.height && formError.height}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <NumberFormat
                  id="field-weight"
                  label={t("fields.weight.label")}
                  placeholder={t("fields.weight.placeHolder")}
                  variant="outlined"
                  color="secondary"
                  type="tel"
                  name="weight"
                  value={form.weight ? form.weight : ""}
                  onChange={inputHandle}
                  customInput={TextField}
                  format="### kg"
                  mask=""
                  shrink={true}
                  fullWidth={true}
                  error={formError?.weight ? true : false}
                  helperText={formError?.weight && formError.weight}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.body.label")}
                  placeholder={t("fields.body.placeHolder")}
                  name="bodyType"
                  value={form.bodyType ? form.bodyType : ""}
                  error={formError?.bodyType ? true : false}
                  helperText={formError?.bodyType && formError.bodyType}
                  onChange={inputHandle}
                  data={bodyTypes}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.hairColor.label")}
                  placeholder={t("fields.hairColor.placeHolder")}
                  name="hairColor"
                  value={form.hairColor ? form.hairColor : ""}
                  error={formError?.hairColor ? true : false}
                  helperText={formError?.hairColor && formError.hairColor}
                  onChange={inputHandle}
                  data={hairColors}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.eyeColor.label")}
                  placeholder={t("fields.eyeColor.placeHolder")}
                  name="eyeColor"
                  value={form.eyeColor ? form.eyeColor : ""}
                  error={formError?.eyeColor ? true : false}
                  helperText={formError?.eyeColor && formError.eyeColor}
                  onChange={inputHandle}
                  data={eyeColors}
                />
              </Grid>
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
          title={t("commons.appearance")}
          open={() => props.open(false)}
          style={{ zIndex: 9 }}
        />
        {renderContent()}
        {renderActions()}
      </Dialog>
    </>
  );
};

export default memo(TemplatesDialogsAppearance);
