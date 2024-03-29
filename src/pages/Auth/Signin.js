import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";

import StoreContext from "../../context/Context";
import api from "../../services/api";
import { setUser } from "../../store/user/user.actions";
import { setPreferences } from "../../store/preferences/preferences.actions";
import TextField from "../../components/atoms/inputs/textfield";
import Button from "../../components/atoms/inputs/button";
import Title from "../../components/atoms/display/title";
import CircularProgress from "../../components/atoms/feedback/circularProgress";
import MainMenu from "../../components/organisms/menus/main";
import OrganismsFooterAuth from "../../components/organisms/footer/auth";

const Signin = ({ t }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { setToken } = useContext(StoreContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const userIp = useSelector((state) => state.ip);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  useEffect(() => {
    ReactGA.pageview("/signin");
  }, []);

  const submit = () => {
    setFormError({});
    let form = {
      email: inputEmailRef.current.value,
      password: inputPasswordRef.current.value,
      userIp: userIp,
    };
    setLoading(true);
    api
      .post("auth/signin", form)
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setToken(response.data.token);
          dispatch(setUser(response.data.document));
          dispatch(setPreferences(response.data.preferences));
          return history.push("/dashboard");
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
                  <Title variant="h1">{t("commons.signin")}</Title>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}></Grid>
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
                    id="field-password"
                    label={t("fields.password.label")}
                    placeholder={t("fields.password.placeHolder")}
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
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    onClick={() => submit()}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={25} color="inherit" />
                    ) : (
                      t("buttons.access")
                    )}
                  </Button>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Button
                    size="large"
                    color="secondary"
                    fullWidth={true}
                    component={RouterLink}
                    to="/password-recover"
                  >
                    {t("buttons.forgotYourPassword")}
                  </Button>
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

export default withTranslation()(Signin);
