import React, { memo, useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";

import api from "../../../services/api";

const OrganismsProfileConnectButton = (props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [accepting, setAccepting] = useState(false);
  const [refusing, setRefusing] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connection, setConnection] = useState();

  const handleConnect = useCallback(() => {
    setConnecting(true);
    api({
      method: "put",
      url: `connections/request`,
      data: { id: props.userId },
    })
      .then((response) => {
        setConnecting(false);
        if (response.data.success) {
          props.connectionUpdate(response.data.connection);
          setConnection(response.data.connection);
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, { variant: "error" });
          }
        }
      })
      .catch((error) => {
        setConnecting(false);
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
      });
  }, [enqueueSnackbar, props, t]);

  const handleAccept = useCallback(() => {
    setAccepting(true);
    api({
      method: "put",
      url: `connections/accept`,
      data: { id: props.userId },
    })
      .then((response) => {
        setAccepting(false);
        if (response.data.success) {
          props.roomUpdate(response.data.room);
          props.connectionUpdate(response.data.connection);
          setConnection(response.data.connection);
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, { variant: "error" });
          }
        }
      })
      .catch((error) => {
        setAccepting(false);
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
      });
  }, [enqueueSnackbar, props, t]);

  const handleRefuse = useCallback(() => {
    setRefusing(true);
    api({
      method: "put",
      url: `connections/refuse`,
      data: { id: props.userId },
    })
      .then((response) => {
        setRefusing(false);
        if (response.data.success) {
          props.connectionUpdate(response.data.connection);
          setConnection(response.data.connection);
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, { variant: "error" });
          }
        }
      })
      .catch((error) => {
        setRefusing(false);
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
      });
  }, [enqueueSnackbar, props, t]);

  const renderButton = () => {
    var result = "";
    switch (connection) {
      case 1:
        result = (
          <Button
            size="large"
            variant="contained"
            color="secondary"
            disabled={connecting}
            onClick={() => handleConnect()}
          >
            {connecting ? (
              <CircularProgress size={25} color="secondary" />
            ) : (
              t("buttons.connect")
            )}
          </Button>
        );
        break;
      case 2:
        result = (
          <Button
            size="large"
            variant="contained"
            color="secondary"
            disabled={true}
          >
            {t("commons.waiting")}
          </Button>
        );
        break;
      case 3:
        result = (
          <>
            <Button
              size="large"
              color="secondary"
              onClick={() => handleRefuse()}
              disabled={refusing || accepting}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              {refusing ? (
                <CircularProgress size={25} color="secondary" />
              ) : (
                t("buttons.refuse")
              )}
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => handleAccept()}
              disabled={refusing || accepting}
            >
              {accepting ? (
                <CircularProgress size={25} color="secondary" />
              ) : (
                t("buttons.accept")
              )}
            </Button>
          </>
        );
        break;
      default:
        result = <></>;
        break;
    }
    return result;
  };

  useEffect(() => {
    setConnection(props.connection);
  }, [props.connection]);

  return <>{renderButton()}</>;
};

export default memo(OrganismsProfileConnectButton);
