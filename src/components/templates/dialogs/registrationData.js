import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";
import { useTheme } from "@material-ui/core/styles";
import moment from "moment";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import api from "../../../services/api";
import StoreContext from "../../../context/Context";
import { setUser } from "../../../store/user/user.actions";
import Typography from "../../atoms/display/typography";
import TextField from "../../atoms/inputs/textfield";
import Button from "../../atoms/inputs/button";
import LinearProgress from "../../atoms/feedback/linearProgress";
import DialogTitle from "../dialogs/dialogTitle";
import AlertDialog from "../../atoms/feedback/alertDialog";

const Component = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { setToken } = useContext(StoreContext);
  const [loadingInformations, setLoadingInformations] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingCancelEmailChange, setLoadingCancelEmailChange] = useState(
    false
  );
  const [alertDialog, setAlertDialog] = useState(false);
  const [erasingAccount, setErasingAccount] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [preLoading, setPreLoading] = useState(true);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [emailToChange, setEmailToChange] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    api({ method: "GET", url: `user/registrationData` })
      .then((response) => {
        setPreLoading(false);
        if (response.data.success) {
          setForm({
            username: response.data.data.username,
            email: response.data.data.email,
            birthday: moment(response.data.data.birthday)
              .utc()
              .format("DD/MM/YYYY"),
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
    api({
      method: "GET",
      url: `user/registrationData/emailChangeRequestPending`,
    })
      .then((response) => {
        if (response.data.success) {
          if (response.data.data?.email) {
            setEmailToChange(true);
          }
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

  const updateRegistrationData = () => {
    api({ method: "GET", url: `user/registrationData` })
      .then((response) => {
        setPreLoading(false);
        if (response.data.success) {
          setForm({
            username: response.data.data.username,
            email: response.data.data.email,
            birthday: moment(response.data.data.birthday)
              .utc()
              .format("DD/MM/YYYY"),
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
  };

  const inputHandle = (event) => {
    setForm((form) => ({
      ...form,
      [event?.target?.name]: event?.target?.value,
    }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const submitInformations = () => {
    setFormError({});
    setLoadingInformations(true);
    api({
      method: "PUT",
      url: `user/registrationData/informations`,
      data: form,
    })
      .then((response) => {
        setLoadingInformations(false);
        if (response.data.success) {
          dispatch(setUser(response.data.document));
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
        setLoadingInformations(false);
        setTimeout(() => {
          props.open(false);
        }, 3000);
      });
  };

  const submitEmail = () => {
    setFormError({});
    setLoadingEmail(true);
    api({
      method: "PUT",
      url: `user/registrationData/email`,
      data: form,
    })
      .then((response) => {
        setLoadingEmail(false);
        if (response.data.success) {
          enqueueSnackbar(t("alerts.savedInformations"), {
            variant: "success",
          });
          setEmailToChange(true);
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
        setLoadingEmail(false);
        setTimeout(() => {
          props.open(false);
        }, 3000);
      });
  };

  const submitCancelEmailChange = () => {
    setFormError({});
    setLoadingCancelEmailChange(true);
    api({
      method: "PUT",
      url: `user/registrationData/cancelEmailChange`,
      data: form,
    })
      .then((response) => {
        setLoadingCancelEmailChange(false);
        if (response.data.success) {
          enqueueSnackbar(t("alerts.savedInformations"), {
            variant: "success",
          });
          updateRegistrationData();
          setEmailToChange(false);
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
        setLoadingCancelEmailChange(false);
        setTimeout(() => {
          props.open(false);
        }, 3000);
      });
  };

  const submitCode = () => {
    setFormError({});
    setLoadingCode(true);
    api({
      method: "PUT",
      url: `user/registrationData/checkCodeToChangeEmail`,
      data: form,
    })
      .then((response) => {
        setLoadingCode(false);
        if (response.data.success) {
          enqueueSnackbar(t("alerts.savedInformations"), {
            variant: "success",
          });
          setEmailToChange(false);
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

  const submitPassword = () => {
    setFormError({});
    setLoadingPassword(true);
    api({
      method: "PUT",
      url: `user/registrationData/password`,
      data: form,
    })
      .then((response) => {
        setLoadingPassword(false);
        if (response.data.success) {
          enqueueSnackbar(t("alerts.savedInformations"), {
            variant: "success",
          });
          setForm((form) => ({
            ...form,
            currentPassword: "",
            newPassword: "",
            passwordRepeat: "",
          }));
        } else {
          if (response.data.message) {
            enqueueSnackbar(t(response.data.message), { variant: "error" });
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

  const deleteAccount = () => {
    setErasingAccount(true);
    api({
      method: "POST",
      url: `user/deleteAccount`,
      data: form,
    })
      .then((response) => {
        setErasingAccount(false);
        if (response.data.success) {
          setToken(null);
          localStorage.removeItem("state");
          localStorage.removeItem("token");
        } else {
          if (response.data.message) {
            enqueueSnackbar(t(response.data.message), { variant: "error" });
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

  const renderTabs = () => {
    if (!preLoading) {
      return (
        <>
          <div
            style={{
              backgroundColor: theme.palette.primary.main,
              zIndex: 10,
              boxShadow: theme.shadows[3],
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label={t("commons.informations")} />
              <Tab label={t("commons.email")} />
              <Tab label={t("commons.password")} />
            </Tabs>
          </div>
        </>
      );
    }
  };

  const renderContentToEmailChange = () => {
    if (emailToChange) {
      return (
        <>
          <Grid container direction="row" spacing={2} justify="center">
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Typography variant="body1" gutterBottom>
                {t("alerts.verificationCodeInstructions")}
              </Typography>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <NumberFormat
                id="field-code"
                label={t("fields.code.label")}
                placeholder={t("fields.code.placeHolder")}
                variant="outlined"
                color="secondary"
                type="tel"
                name="code"
                value={form.code ? form.code : ""}
                onChange={inputHandle}
                customInput={TextField}
                format="######"
                mask=""
                shrink={true}
                fullWidth={true}
                error={formError?.code ? true : false}
                helperText={formError?.code && formError.code}
              />
            </Grid>
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid container direction="row" spacing={2} justify="center">
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Typography variant="body1" gutterBottom>
                {t("alerts.passwordChangeInfo")}
              </Typography>
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
                value={form.email ? form.email : ""}
                onChange={inputHandle}
                error={formError?.email ? true : false}
                helperText={formError?.email && formError.email}
                shrink={true}
                fullWidth={true}
              />
            </Grid>
          </Grid>
        </>
      );
    }
  };

  const renderActionsToEmailChange = () => {
    if (emailToChange) {
      return (
        <>
          <Button
            size="large"
            color="secondary"
            onClick={() => submitCancelEmailChange()}
            disabled={loadingCancelEmailChange}
            style={{ marginRight: 10 }}
          >
            {loadingCancelEmailChange ? (
              <CircularProgress size={25} color="secondary" />
            ) : (
              t("buttons.cancelChange")
            )}
          </Button>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => submitCode()}
            disabled={loadingCode}
          >
            {loadingCode ? (
              <CircularProgress size={25} color="secondary" />
            ) : (
              t("buttons.conclude")
            )}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => submitEmail()}
            disabled={loadingEmail}
          >
            {loadingEmail ? (
              <CircularProgress size={25} color="secondary" />
            ) : (
              t("buttons.continue")
            )}
          </Button>
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
            <div hidden={tabValue !== 0}>
              <Grid container direction="row" spacing={2} justify="center">
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    id="field-username"
                    label={t("fields.username.label")}
                    placeholder={t("fields.username.placeHolder")}
                    type="text"
                    color="secondary"
                    variant="outlined"
                    name="username"
                    value={form.username ? form.username : ""}
                    onChange={inputHandle}
                    error={formError?.username ? true : false}
                    helperText={formError?.username && formError.username}
                    shrink={true}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <NumberFormat
                    id="field-birthday"
                    label={t("fields.birthday.label")}
                    placeholder={t("fields.birthday.placeHolder")}
                    variant="outlined"
                    color="secondary"
                    type="tel"
                    name="birthday"
                    value={form.birthday ? form.birthday : ""}
                    onChange={inputHandle}
                    customInput={TextField}
                    format="##/##/####"
                    mask="_"
                    shrink={true}
                    fullWidth={true}
                    error={formError?.birthday ? true : false}
                    helperText={formError?.birthday && formError.birthday}
                  />
                </Grid>
              </Grid>
            </div>
            <div hidden={tabValue !== 1}>{renderContentToEmailChange()}</div>
            <div hidden={tabValue !== 2}>
              <Grid container direction="row" spacing={2} justify="center">
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    id="field-currentPassword"
                    label={t("fields.currentPassword.label")}
                    placeholder={t("fields.currentPassword.placeHolder")}
                    type="password"
                    color="secondary"
                    variant="outlined"
                    name="currentPassword"
                    value={form.currentPassword ? form.password : ""}
                    onChange={inputHandle}
                    error={formError?.currentPassword ? true : false}
                    helperText={
                      formError?.currentPassword && formError.currentPassword
                    }
                    shrink={true}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    id="field-newPassword"
                    label={t("fields.newPassword.label")}
                    placeholder={t("fields.newPassword.placeHolder")}
                    type="password"
                    color="secondary"
                    variant="outlined"
                    name="newPassword"
                    value={form.newPassword ? form.newPassword : ""}
                    onChange={inputHandle}
                    error={formError?.newPassword ? true : false}
                    helperText={formError?.newPassword && formError.newPassword}
                    shrink={true}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    id="field-passwordRepeat"
                    label={t("fields.passwordRepeat.label")}
                    placeholder={t("fields.passwordRepeat.placeHolder")}
                    type="password"
                    color="secondary"
                    variant="outlined"
                    name="passwordRepeat"
                    value={form.passwordRepeat ? form.passwordRepeat : ""}
                    onChange={inputHandle}
                    error={formError?.passwordRepeat ? true : false}
                    helperText={
                      formError?.passwordRepeat && formError.passwordRepeat
                    }
                    shrink={true}
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </div>
          </DialogContent>
        </>
      );
    }
  };

  const eraseButton = () => {
    return (
      <>
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => setAlertDialog(true)}
        >
          {erasingAccount ? (
            <CircularProgress size={25} color="secondary" />
          ) : (
            t("buttons.delete")
          )}
        </Button>
      </>
    );
  };

  const renderActions = () => {
    if (!preLoading) {
      if (tabValue === 0) {
        return (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexAlign: "center",
                justifyContent: "space-between",
              }}
            >
              {eraseButton()}
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={() => submitInformations()}
                disabled={loadingInformations}
              >
                {loadingInformations ? (
                  <CircularProgress size={25} color="secondary" />
                ) : (
                  t("buttons.change")
                )}
              </Button>
            </div>
          </>
        );
      }
      if (tabValue === 1) {
        return (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexAlign: "center",
                justifyContent: "space-between",
              }}
            >
              {eraseButton()}
              {renderActionsToEmailChange()}
            </div>
          </>
        );
      }
      if (tabValue === 2) {
        return (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexAlign: "center",
                justifyContent: "space-between",
              }}
            >
              {eraseButton()}
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={() => submitPassword()}
                disabled={loadingPassword}
              >
                {loadingPassword ? (
                  <CircularProgress size={25} color="secondary" />
                ) : (
                  t("buttons.change")
                )}
              </Button>
            </div>
          </>
        );
      }
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
          title={t("mainMenu.myAccount")}
          open={() => props.open(false)}
          style={{ zIndex: 9 }}
        />
        {renderTabs()}
        {renderContent()}
        <DialogActions style={{ zIndex: 8 }}>{renderActions()}</DialogActions>
      </Dialog>
      {alertDialog && (
        <AlertDialog
          open={alertDialog}
          title={t("commons.warning")}
          text={t("alerts.eraseAccount")}
          handleClose={setAlertDialog}
          handleAgree={deleteAccount}
        />
      )}
    </>
  );
};

export default Component;
