import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { Container, Grid, Divider, LinearProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";

import api from "../../services/api";
import TextField from "../../components/atoms/inputs/textfield";
import Button from "../../components/atoms/inputs/button";
import Title from "../../components/atoms/display/title";
import Typography from "../../components/atoms/display/typography";
import CircularProgress from "../../components/atoms/feedback/circularProgress";
import MainMenu from "../../components/organisms/menus/main";
import OrganismsFooterAuth from "../../components/organisms/footer/auth";

const PasswordRecover = ({ t }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = React.useState(1);
  const [steps] = React.useState(2);
  const [formError, setFormError] = useState({});
  const history = useHistory();
  const inputUsernameRef = useRef();
  const inputEmailRef = useRef();
  const inputCodeRef = useRef();
  const inputPasswordRef = useRef();
  const inputPasswordRetypeRef = useRef();

  const submit = () => {
    setFormError({});
    setLoading(true);
    let form = {
      username: inputUsernameRef?.current?.value,
      email: inputEmailRef?.current?.value,
      code: inputCodeRef?.current?.value,
      password: inputPasswordRef?.current?.value,
      passwordRetype: inputPasswordRetypeRef?.current?.value,
    };
    api
      .post(`auth/passwordRecovery${step}`, form)
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          if (step < steps) {
            setStep(step + 1);
          }
          if (step === steps) {
            return history.push("/signin");
          }
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
        setLoading(false);
      });
  };

  return (
    <>
      <MainMenu />
      <Container>
        <Grid container direction="row" spacing={3} justify="center">
          <Grid item xl={4} lg={4} md={6} sm={8} xs={12}>
            <div style={{ padding: 20 }}>
              <Grid container direction="row" spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Title variant="h1">{t("commons.passwordRecovery")}</Title>
                  <div style={{ height: 9 }} />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                spacing={2}
                style={{ display: step !== 1 && "none" }}
              >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="body1">
                    {t("alerts.passwordRecoverInfo")}
                    <div style={{ height: 10 }} />
                  </Typography>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    id="field-username"
                    label={t("fields.username.label")}
                    placeholder={t("fields.username.placeHolder")}
                    type="text"
                    color="secondary"
                    variant="outlined"
                    name="username"
                    inputRef={inputUsernameRef}
                    error={formError?.username ? true : false}
                    helperText={formError?.username && formError.username}
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
                    shrink
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                spacing={2}
                style={{ display: step !== 2 && "none" }}
              >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="body1" gutterBottom>
                    {t("alerts.passwordRecoverSuccess")}
                    <div style={{ height: 10 }} />
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
                    inputRef={inputCodeRef}
                    customInput={TextField}
                    format="######"
                    mask=""
                    shrink={true}
                    fullWidth={true}
                    error={formError?.code ? true : false}
                    helperText={formError?.code && formError.code}
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
                    name="password"
                    inputRef={inputPasswordRef}
                    error={formError?.password ? true : false}
                    helperText={formError?.password && formError.password}
                    shrink={true}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    id="field-passwordRetype"
                    label={t("fields.passwordRetype.label")}
                    placeholder={t("fields.passwordRetype.placeHolder")}
                    type="password"
                    color="secondary"
                    variant="outlined"
                    name="passwordRetype"
                    inputRef={inputPasswordRetypeRef}
                    error={formError?.passwordRetype ? true : false}
                    helperText={
                      formError?.passwordRetype && formError.passwordRetype
                    }
                    shrink={true}
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <div style={{ height: 15 }} />
              <Grid container direction="row" spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      {step > 1 && (
                        <Button
                          size="large"
                          variant="outlined"
                          color="secondary"
                          onClick={() => setStep(step - 1)}
                        >
                          {t("buttons.back")}
                        </Button>
                      )}
                    </div>
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      disabled={loading}
                      onClick={() => submit()}
                    >
                      {loading ? (
                        <CircularProgress size={25} color="secondary" />
                      ) : step === steps ? (
                        t("buttons.conclude")
                      ) : (
                        t("buttons.continue")
                      )}
                    </Button>
                  </div>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <LinearProgress
                    variant="determinate"
                    value={(step * 100) / steps}
                    color="secondary"
                  />
                  <div style={{ height: 5 }} />
                  <Typography variant="body2" component="p" color="secondary">
                    passo {step} de {steps}
                  </Typography>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <OrganismsFooterAuth />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default withTranslation()(PasswordRecover);
