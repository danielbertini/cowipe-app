import React, { memo, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  CircularProgress,
  Slider,
  Typography,
  FormControlLabel,
  Switch,
  Divider,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import api from "../../../services/api";
import SelectField from "../../../components/atoms/inputs/selectfield";
import LinearProgress from "../../atoms/feedback/linearProgress";
import DialogTitle from "../dialogs/dialogTitle";
import Snackbar from "../../atoms/feedback/snackbar";

const TemplatesDialogTuneSearch = (props) => {
  const useStyles = makeStyles((theme) => ({
    fieldArea: {
      padding: 15,
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 5,
      backgroundColor: theme.palette.divider,
      borderRadius: theme.shape.borderRadius,
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState([]);
  const [formError, setFormError] = useState({});
  const [submiting, setSubmiting] = useState(false);
  const [usersOnlineValue, setUsersOnlineValue] = useState(false);
  const [usersWithPhotoValue, setUsersWithPhotoValue] = useState(false);
  const [distanceValue, setDistanceValue] = useState(200);
  const [weightValue, setWeightValue] = useState([40, 200]);
  const [heightValue, setHeightValue] = useState([100, 250]);
  const [ageValue, setAgeValue] = useState([18, 100]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [hairColors, setHairColors] = useState([]);
  const [eyeColors, setEyeColors] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [relationshipTypes, setRelationShipTypes] = useState([]);
  const [sugarTypes, setSugarTypes] = useState([]);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChangeUsersWithPhoto = (event) => {
    setUsersWithPhotoValue(event.target.checked);
  };

  const handleChangeusersOnlineValue = (event) => {
    setUsersOnlineValue(event.target.checked);
  };

  const handleChangeDistance = (event, newValue) => {
    setDistanceValue(newValue);
  };

  const handleChangeWeight = (event, newValue) => {
    setWeightValue(newValue);
  };

  const handleChangeHeight = (event, newValue) => {
    setHeightValue(newValue);
  };

  const handleChangeAge = (event, newValue) => {
    setAgeValue(newValue);
  };

  const inputHandle = (event) => {
    setForm((form) => ({
      ...form,
      [event?.target?.name]: event?.target?.value,
    }));
  };

  const handleSubmit = useCallback(() => {
    setFormError([]);
    setSubmiting(true);
    let data = {
      usersOnline: usersOnlineValue,
      usersWithPhoto: usersWithPhotoValue,
      distance: distanceValue,
      weight: weightValue,
      height: heightValue,
      age: ageValue,
      bodyType: form.bodyType,
      hairColor: form.hairColor,
      eyeColor: form.eyeColor,
      maritalStatus: form.maritalStatus,
      relationShip: form.relationShip,
      sugarType: form.sugarType,
    };
    api({
      method: "PUT",
      url: `user/tuneSearch`,
      data: data,
    })
      .then((response) => {
        setSubmiting(false);
        if (response.data.success) {
          props.updateSearch();
          props.handleClose(false);
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
        setTimeout(() => {
          props.handleClose(false);
        }, 3000);
      });
  }, [
    ageValue,
    distanceValue,
    form.bodyType,
    form.eyeColor,
    form.hairColor,
    form.maritalStatus,
    form.relationShip,
    form.sugarType,
    heightValue,
    props,
    t,
    usersOnlineValue,
    usersWithPhotoValue,
    weightValue,
  ]);

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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: 10,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={usersOnlineValue}
                        onChange={(event) =>
                          handleChangeusersOnlineValue(event)
                        }
                      />
                    }
                    label={t("buttons.usersOnline")}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={usersWithPhotoValue}
                        onChange={(event) => handleChangeUsersWithPhoto(event)}
                      />
                    }
                    label={t("buttons.usersWithPhoto")}
                  />
                </div>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Divider />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className={classes.fieldArea}>
                  <Typography
                    variant="body2"
                    style={{
                      color: theme.palette.text.primary,
                      paddingBottom: 5,
                      marginLeft: -10,
                    }}
                  >
                    {t("fields.tunning.distance.label")}
                  </Typography>
                  <Slider
                    value={distanceValue}
                    onChange={handleChangeDistance}
                    valueLabelDisplay="auto"
                    color="secondary"
                    defaultValue={200}
                    min={1}
                    max={200}
                  />
                </div>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className={classes.fieldArea}>
                  <Typography
                    variant="body2"
                    style={{
                      color: theme.palette.text.primary,
                      paddingBottom: 5,
                      marginLeft: -10,
                    }}
                  >
                    {t("fields.tunning.age.label")}
                  </Typography>
                  <Slider
                    value={ageValue}
                    onChange={handleChangeAge}
                    valueLabelDisplay="auto"
                    color="secondary"
                    min={18}
                    max={100}
                  />
                </div>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className={classes.fieldArea}>
                  <Typography
                    variant="body2"
                    style={{
                      color: theme.palette.text.primary,
                      paddingBottom: 5,
                      marginLeft: -10,
                    }}
                  >
                    {t("fields.tunning.height.label")}
                  </Typography>
                  <Slider
                    value={heightValue}
                    onChange={handleChangeHeight}
                    valueLabelDisplay="auto"
                    color="secondary"
                    min={100}
                    max={250}
                  />
                </div>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className={classes.fieldArea}>
                  <Typography
                    variant="body2"
                    style={{
                      color: theme.palette.text.primary,
                      paddingBottom: 5,
                      marginLeft: -10,
                    }}
                  >
                    {t("fields.tunning.weight.label")}
                  </Typography>
                  <Slider
                    value={weightValue}
                    onChange={handleChangeWeight}
                    valueLabelDisplay="auto"
                    color="secondary"
                    min={40}
                    max={200}
                  />
                </div>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Divider />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.tunning.maritalStatus.label")}
                  placeholder={t("fields.tunning.maritalStatus.placeHolder")}
                  name="maritalStatus"
                  value={form.maritalStatus ? form.maritalStatus : ""}
                  error={formError?.maritalStatus ? true : false}
                  helperText={
                    formError?.maritalStatus && formError.maritalStatus
                  }
                  data={maritalStatus}
                  onChange={inputHandle}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.tunning.relationship.label")}
                  placeholder={t("fields.tunning.relationship.placeHolder")}
                  name="relationShip"
                  value={form.relationShip ? form.relationShip : ""}
                  error={formError?.relationship ? true : false}
                  helperText={formError?.relationship && formError.relationship}
                  data={relationshipTypes}
                  onChange={inputHandle}
                />
              </Grid>
              {renderSugarTypes()}
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.tunning.bodyTypes.label")}
                  placeholder={t("fields.tunning.bodyTypes.placeHolder")}
                  name="bodyType"
                  value={form.bodyType ? form.bodyType : ""}
                  error={formError?.bodyType ? true : false}
                  helperText={formError?.bodyType && formError.bodyType}
                  data={bodyTypes}
                  onChange={inputHandle}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.tunning.hairColors.label")}
                  placeholder={t("fields.tunning.hairColors.placeHolder")}
                  name="hairColor"
                  value={form.hairColor ? form.hairColor : ""}
                  error={formError?.hairColor ? true : false}
                  helperText={formError?.hairColor && formError.hairColor}
                  data={hairColors}
                  onChange={inputHandle}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.tunning.eyeColors.label")}
                  placeholder={t("fields.tunning.eyeColors.placeHolder")}
                  name="eyeColor"
                  value={form.eyeColor ? form.eyeColor : ""}
                  error={formError?.eyeColor ? true : false}
                  helperText={formError?.eyeColor && formError.eyeColor}
                  data={eyeColors}
                  onChange={inputHandle}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </>
      );
    }
  };

  const renderSugarTypes = () => {
    if (form.relationShip === "5fa9eb3a201036a4efa3f271") {
      return (
        <>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <SelectField
              label={t("fields.tunning.sugarType.label")}
              placeholder={t("fields.tunning.sugarType.placeHolder")}
              name="sugarType"
              value={form.sugarType ? form.sugarType : ""}
              error={formError?.sugarType ? true : false}
              helperText={formError?.sugarType && formError.sugarType}
              data={sugarTypes}
              onChange={inputHandle}
            />
          </Grid>
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
              color="secondary"
              onClick={() => {
                setUsersOnlineValue(false);
                setUsersWithPhotoValue(false);
                setDistanceValue(200);
                setWeightValue([40, 200]);
                setHeightValue([100, 250]);
                setAgeValue([18, 100]);
                setForm([]);
              }}
            >
              {t("buttons.clean")}
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => handleSubmit()}
              disabled={loading || submiting}
            >
              {submiting ? (
                <CircularProgress size={25} color="secondary" />
              ) : (
                t("buttons.apply")
              )}
            </Button>
          </DialogActions>
        </>
      );
    }
  };

  useEffect(() => {
    api({ method: "GET", url: `commons/getTunningSearchOptions` })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setMaritalStatus(response.data.data.maritalStatus);
          setSugarTypes(response.data.data.sugarTypes);
          setRelationShipTypes(response.data.data.relationshipTypes);
          setBodyTypes(response.data.data.bodyTypes);
          setHairColors(response.data.data.hairColors);
          setEyeColors(response.data.data.eyeColors);
          setUsersOnlineValue(response.data.data.userTuneSearch.usersOnline);
          setUsersWithPhotoValue(
            response.data.data.userTuneSearch.usersWithPhoto
          );
          setDistanceValue(response.data.data.userTuneSearch.distance);
          setAgeValue(response.data.data.userTuneSearch.age);
          setHeightValue(response.data.data.userTuneSearch.height);
          setWeightValue(response.data.data.userTuneSearch.weight);
          setForm((form) => ({
            ...form,
            maritalStatus: response.data.data.userTuneSearch.maritalStatus,
            relationShip: response.data.data.userTuneSearch.relationShip,
            sugarType: response.data.data.userTuneSearch.sugarType,
            bodyType: response.data.data.userTuneSearch.bodyType,
            hairColor: response.data.data.userTuneSearch.hairColor,
            eyeColor: response.data.data.userTuneSearch.eyeColor,
          }));
        }
      })
      .catch((error) => {
        setTimeout(() => {
          props.handleClose(false);
        }, 3000);
      });
  }, [props, t]);

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
          title={t("dialogs.tuneSearch.title")}
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

export default memo(TemplatesDialogTuneSearch);
