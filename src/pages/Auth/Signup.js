import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { setUser } from "../../store/user/user.actions";
import { setPreferences } from "../../store/preferences/preferences.actions";
import StoreContext from "../../context/Context";
import api from "../../services/api";
import Typography from "../../components/atoms/display/typography";
import Button from "../../components/atoms/inputs/button";
import SelectField from "../../components/atoms/inputs/selectfield";
import TextField from "../../components/atoms/inputs/textfield";
import Title from "../../components/atoms/display/title";
import MainMenu from "../../components/organisms/menus/main";

import {
  Container,
  Grid,
  CircularProgress,
  LinearProgress,
  Divider,
} from "@material-ui/core";

const Signup = ({ t }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [step, setStep] = useState(1);
  const [steps] = useState(4);
  const [genders, setGenders] = useState([]);
  const [orientations, setOrientations] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [relationshipType, setRelationshipType] = useState();
  const [relationshipTypes, setRelationshipTypes] = useState([]);
  const [sugarTypes, setSugarTypes] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [hairColors, setHairColors] = useState([]);
  const [eyeColors, setEyeColors] = useState([]);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();
  const inputUsernameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputPasswordRetypeRef = useRef();
  const inputBirthdayRef = useRef();
  const inputGenderRef = useRef();
  const inputOrientationRef = useRef();
  const inputMaritalStatusRef = useRef();
  const inputRelationshipRef = useRef();
  const inputSugarRef = useRef();
  const inputHeightRef = useRef();
  const inputWeightRef = useRef();
  const inputBodyTypeRef = useRef();
  const inputHairColorRef = useRef();
  const inputEyeColorRef = useRef();
  const inputCodeRef = useRef();
  const userIp = useSelector((state) => state.ip);

  useEffect(() => {
    api.get(`commons/getGenders`).then((response) => {
      response.data.success && setGenders(response.data.result);
    });
    api.get(`commons/getOrientations`).then((response) => {
      response.data.success && setOrientations(response.data.result);
    });
    api.get(`commons/getMaritalStatus`).then((response) => {
      response.data.success && setMaritalStatus(response.data.result);
    });
    api.get(`commons/getRelationshipTypes`).then((response) => {
      response.data.success && setRelationshipTypes(response.data.result);
    });
    api.get(`commons/getSugarTypes`).then((response) => {
      response.data.success && setSugarTypes(response.data.result);
    });
    api.get(`commons/getBodyTypes`).then((response) => {
      response.data.success && setBodyTypes(response.data.result);
    });
    api.get(`commons/getHairColors`).then((response) => {
      response.data.success && setHairColors(response.data.result);
    });
    api.get(`commons/getEyeColors`).then((response) => {
      response.data.success && setEyeColors(response.data.result);
    });
  }, []);

  const submit = () => {
    setFormError({});
    setLoading(true);
    let form = {
      username: inputUsernameRef?.current?.value,
      email: inputEmailRef?.current?.value,
      password: inputPasswordRef?.current?.value,
      passwordRetype: inputPasswordRetypeRef?.current?.value,
      birthday: inputBirthdayRef?.current?.value,
      gender: inputGenderRef?.current?.value,
      orientation: inputOrientationRef?.current?.value,
      maritalStatus: inputMaritalStatusRef?.current?.value,
      relationship: inputRelationshipRef?.current?.value,
      sugar: inputSugarRef?.current?.value,
      height: inputHeightRef?.current?.value,
      weight: inputWeightRef?.current?.value,
      bodyType: inputBodyTypeRef?.current?.value,
      hairColor: inputHairColorRef?.current?.value,
      eyeColor: inputEyeColorRef?.current?.value,
      code: inputCodeRef?.current?.value,
      userIp: userIp,
    };
    api
      .post(`auth/signup${step}`, form)
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          if (step < steps) {
            setStep(step + 1);
          }
          if (step === steps) {
            setToken(response.data.token);
            dispatch(setUser(response.data.document));
            dispatch(setPreferences(response.data.preferences));
            return history.push("/dashboard");
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
            <Grid container direction="row" spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Title variant="h1">{t("commons.signup")}</Title>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              spacing={2}
              style={{ display: step !== 1 && "none" }}
            >
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  {t("commons.registrationData")}
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
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <NumberFormat
                  id="field-birthday"
                  label={t("fields.birthday.label")}
                  placeholder={t("fields.birthday.placeHolder")}
                  variant="outlined"
                  color="secondary"
                  type="tel"
                  name="birthday"
                  inputRef={inputBirthdayRef}
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
            <Grid
              container
              direction="row"
              spacing={2}
              style={{ display: step !== 2 && "none" }}
            >
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  {t("commons.relationship")}
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.gender.label")}
                  placeholder={t("fields.gender.placeHolder")}
                  name="gender"
                  inputRef={inputGenderRef}
                  error={formError?.gender ? true : false}
                  helperText={formError?.gender && formError.gender}
                  hideItem={"5faedb304f858c44b5af453b"}
                  data={genders}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.orientation.label")}
                  placeholder={t("fields.orientation.placeHolder")}
                  name="orientation"
                  inputRef={inputOrientationRef}
                  error={formError?.orientation ? true : false}
                  helperText={formError?.orientation && formError.orientation}
                  data={orientations}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.maritalStatus.label")}
                  placeholder={t("fields.maritalStatus.placeHolder")}
                  name="maritalStatus"
                  inputRef={inputMaritalStatusRef}
                  error={formError?.maritalStatus ? true : false}
                  helperText={
                    formError?.maritalStatus && formError.maritalStatus
                  }
                  data={maritalStatus}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.relationship.label")}
                  placeholder={t("fields.relationship.placeHolder")}
                  name="relationship"
                  inputRef={inputRelationshipRef}
                  onChange={(event) => setRelationshipType(event.target.value)}
                  error={formError?.relationship ? true : false}
                  helperText={formError?.relationship && formError.relationship}
                  data={relationshipTypes}
                />
              </Grid>
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{
                  display:
                    relationshipType &&
                    relationshipType !== "5fa9eb3a201036a4efa3f271" &&
                    "none",
                }}
              >
                <SelectField
                  label={t("fields.sugar.label")}
                  placeholder={t("fields.sugar.placeHolder")}
                  name="sugar"
                  inputRef={inputSugarRef}
                  error={formError?.sugar ? true : false}
                  helperText={formError?.sugar && formError.sugar}
                  data={sugarTypes}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              spacing={2}
              style={{ display: step !== 3 && "none" }}
            >
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  {t("commons.appearance")}
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <NumberFormat
                  id="field-height"
                  label={t("fields.height.label")}
                  placeholder={t("fields.height.placeHolder")}
                  variant="outlined"
                  color="secondary"
                  type="tel"
                  name="height"
                  inputRef={inputHeightRef}
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
                  inputRef={inputWeightRef}
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
                  inputRef={inputBodyTypeRef}
                  error={formError?.bodyType ? true : false}
                  helperText={formError?.bodyType && formError.bodyType}
                  data={bodyTypes}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.hairColor.label")}
                  placeholder={t("fields.hairColor.placeHolder")}
                  name="hairColor"
                  inputRef={inputHairColorRef}
                  error={formError?.hairColor ? true : false}
                  helperText={formError?.hairColor && formError.hairColor}
                  data={hairColors}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectField
                  label={t("fields.eyeColor.label")}
                  placeholder={t("fields.eyeColor.placeHolder")}
                  name="eyeColor"
                  inputRef={inputEyeColorRef}
                  error={formError?.eyeColor ? true : false}
                  helperText={formError?.eyeColor && formError.eyeColor}
                  data={eyeColors}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              spacing={2}
              style={{ display: step !== 4 && "none" }}
            >
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
            </Grid>
            <div style={{ height: 15 }} />
            <Grid container direction="row" spacing={2}>
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
                <Divider />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography variant="body1" gutterBottom>
                  {t("app.copyright")}
                </Typography>
                <Typography variant="body2">{t("alerts.legal")}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default withTranslation()(Signup);
