import React, { memo, useCallback, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

const StripeCheckoutForm = (props) => {
  const useStyles = makeStyles((theme) => ({
    cardElement: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: 15,
    },
  }));

  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        "::placeholder": {
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.fontSize,
          color: theme.palette.text.primary,
        },
      },
      invalid: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        color: theme.palette.error.main,
        iconColor: theme.palette.error.main,
      },
    },
  };

  const handleChange = async (event) => {
    props.error(event.error ? event.error.message : "");
    props.disabled(event.empty);
  };

  const handleSubmit = useCallback(async () => {
    props.processing(true);
    const payload = await stripe?.confirmCardPayment(props.clientSecret, {
      receipt_email: user.email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload?.error) {
      props.error(payload.error.message);
      props.processing(false);
    } else {
      props.error(null);
      props.processing(false);
      props.succeeded(true);
    }
  }, [elements, props, stripe, user.email]);

  useEffect(() => {
    if (props.submitPayment) {
      handleSubmit();
    }
  }, [handleSubmit, props.submitPayment]);

  return (
    <>
      <CardElement
        className={classes.cardElement}
        options={cardStyle}
        onChange={handleChange}
      />
    </>
  );
};

export default memo(StripeCheckoutForm);
