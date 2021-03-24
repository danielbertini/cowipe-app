import React, { memo, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { CardGiftcardRounded as GiftIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { SwipeableDrawer, Fab, Zoom, Divider } from "@material-ui/core";

import api from "../../../services/api";
import Typography from "../display/typography";
import Snackbar from "../../atoms/feedback/snackbar";
import CircularProgress from "../../atoms/feedback/circularProgress";
import IconButton from "../../atoms/inputs/iconButton";
import Button from "../../atoms/inputs/button";
import Gift from "../../molecules/products/gift";
import DialogStore from "../../templates/dialogs/store";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: 30,
    },
  }));

  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [profile, setProfile] = useState([]);
  const [balance, setBalance] = useState(0);
  const [dialogStore, setDialogStore] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const load = () => {
    setLoading(true);
    api({ method: "POST", url: `gifts/getGifts`, data: { id: props.userId } })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setOpen(true);
          setProfile(response.data.profile);
          setItems(response.data.gifts);
          setBalance(response.data.balance);
        } else {
          if (response.data.message) {
            setSnackbarMessage(response.data.message);
            setSnackbar(true);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        setSnackbarMessage(t("alerts.unavailableService"));
        setSnackbar(true);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      });
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      <Zoom
        in={true}
        timeout={transitionDuration}
        unmountOnExit
        style={{
          transitionDelay: `${true ? transitionDuration.exit : 0}ms`,
        }}
      >
        <Fab
          color="secondary"
          style={{
            position: "absolute",
            zIndex: 20,
            top: 150,
            right: 30,
          }}
          onClick={() => {
            setSelectedItem(null);
            load();
          }}
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "#fff" }} />
          ) : (
            <GiftIcon style={{ color: "#fff" }} />
          )}
        </Fab>
      </Zoom>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div className={classes.root}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography variant="body1">
                {t("commons.sendAGift", { name: profile?.username })}
              </Typography>
              <Typography variant="body2">
                {t("alerts.yourBalance", { balance: balance })}
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <IconButton onClick={() => setDialogStore(true)}>
                <img
                  src={"./coin.png"}
                  style={{ width: 24, height: 24 }}
                  alt="coin"
                />
              </IconButton>
              <div style={{ width: 10 }} />
              <Button
                disabled={selectedItem ? false : true}
                variant="contained"
                color="secondary"
              >
                {t("buttons.send")}
              </Button>
            </div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              flexWrap: "nowrap",
            }}
          >
            {items?.map((el) => {
              return (
                <>
                  <div style={{ flexGrow: 0, marginRight: 10 }}>
                    <Gift
                      id={el?._id}
                      selected={el?._id === selectedItem}
                      onClick={setSelectedItem}
                      data={el}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </SwipeableDrawer>
      {dialogStore && <DialogStore open={setDialogStore} />}
      {snackbar && (
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
      )}
    </>
  );
};

export default memo(Component);
