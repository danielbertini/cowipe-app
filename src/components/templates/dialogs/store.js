import React, { useState, useCallback, useEffect, memo } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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

import i18n from "../../../i18n";
import api from "../../../services/api";
import Info from "../../atoms/display/info";
import Typography from "../../atoms/display/typography";
import Snackbar from "../../atoms/feedback/snackbar";
import LinearProgress from "../../atoms/feedback/linearProgress";
import MoleculesProductsCoin from "../../molecules/products/coin";
import StripeCheckoutForm from "../../stripe/checkoutForm";
import DialogTitle from "../dialogs/dialogTitle";

const TemplatesDialogsStore = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [loadingClientSecret, setLoadingClientSecret] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [balance, setBalance] = useState();
  const [coins, setCoins] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [clientSecret, setClientSecret] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [submitPayment, setSubmitPayment] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const stripePromise = loadStripe("pk_test_YyKvghf2xaxe13EPRltPiuNr");

  const getBalance = useCallback(() => {
    api({ method: "GET", url: `coins/getBalance` })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setBalance(response.data.balance);
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

  const getCoins = useCallback(() => {
    api({ method: "GET", url: `coins/getCoins` })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setCoins(response.data.result);
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

  useEffect(() => {
    getCoins();
    getBalance();
  }, [succeeded, getBalance, getCoins, props, t]);

  const getClientSecret = () => {
    setLoadingClientSecret(true);
    api({
      method: "POST",
      url: `payments/createPaymentIntent`,
      data: { coinId: selectedItem },
    })
      .then((response) => {
        setLoadingClientSecret(false);
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        setLoadingClientSecret(false);
      });
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
      if (clientSecret) {
        return (
          <>
            <DialogContent style={{ zIndex: 8 }}>
              <Grid container direction="row" spacing={2} justify="center">
                {succeeded ? (
                  <>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Info text={t("alerts.processingPayment")} />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Elements stripe={stripePromise}>
                        <StripeCheckoutForm
                          clientSecret={clientSecret}
                          submitPayment={submitPayment}
                          processing={setProcessing}
                          error={setError}
                          succeeded={setSucceeded}
                          disabled={setDisabled}
                        />
                      </Elements>
                    </Grid>
                    {error && (
                      <>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Info type="error" text={error} />
                        </Grid>
                      </>
                    )}
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <img
                        src={
                          theme.palette.type === "dark"
                            ? "./stripe-white.png"
                            : "./stripe-black.png"
                        }
                        style={{
                          height: 22,
                          opacity: 0.5,
                          marginTop: 0,
                          marginBottom: 5,
                        }}
                        alt="Stripe"
                      />
                      <Typography variant="body2">
                        {t("alerts.secureInfo")}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </DialogContent>
          </>
        );
      } else {
        return (
          <>
            <DialogContent style={{ zIndex: 8 }}>
              <Grid container direction="row" spacing={2} justify="center">
                {coins?.map((el) => {
                  return (
                    <>
                      <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <MoleculesProductsCoin
                          selected={el?._id === selectedItem}
                          onClick={setSelectedItem}
                          id={el?._id}
                          description={el?.description[i18n.language]}
                          price={el?.price}
                        />
                      </Grid>
                    </>
                  );
                })}
                {balance && (
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Info
                      text={t("alerts.yourBalance", { balance: balance })}
                    />
                  </Grid>
                )}
              </Grid>
            </DialogContent>
          </>
        );
      }
    }
  };

  const renderActions = () => {
    if (!loading) {
      return (
        <>
          <DialogActions>
            {clientSecret ? (
              <>
                <Button
                  size="large"
                  color="secondary"
                  onClick={() => {
                    setSelectedItem();
                    setClientSecret(null);
                    setSucceeded(false);
                    setSubmitPayment(false);
                    setError(null);
                    setDisabled(true);
                  }}
                  disabled={!selectedItem || processing}
                >
                  {t("buttons.back")}
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={() => setSubmitPayment(true)}
                  disabled={processing || disabled || succeeded}
                >
                  {processing ? (
                    <CircularProgress size={25} color="secondary" />
                  ) : (
                    t("buttons.pay")
                  )}
                </Button>
              </>
            ) : (
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={() => getClientSecret()}
                disabled={!selectedItem || loadingClientSecret}
              >
                {loadingClientSecret ? (
                  <CircularProgress size={25} color="secondary" />
                ) : (
                  t("buttons.buy")
                )}
              </Button>
            )}
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
          title={t("dialogs.store.title")}
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

export default memo(TemplatesDialogsStore);
