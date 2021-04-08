import React, { memo, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { CardGiftcardRounded as GiftIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { SwipeableDrawer, Fab, Zoom, Divider } from "@material-ui/core";
import ScrollContainer from "react-indiana-drag-scroll";
import { useSnackbar } from "notistack";

import api from "../../../services/api";
import Typography from "../display/typography";
import CircularProgress from "../../atoms/feedback/circularProgress";
import IconButton from "../../atoms/inputs/iconButton";
import Button from "../../atoms/inputs/button";
import Gift from "../../molecules/products/gift";
import DialogStore from "../../templates/dialogs/store";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 30,
  },
  title: {
    width: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "& > *": {
      overflow: "hidden",
      maxWidth: "100%",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  items: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    overflowX: "auto",
    scrollBehavior: "smooth",
    paddingBottom: 10,
    cursor: "grab",
    "&::-webkit-scrollbar": {
      height: theme.shape.scrollSize,
      width: theme.shape.scrollSize,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: theme.shape.scrollRadius,
    },
  },
}));

const AtomsInputsGiftButton = (props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [putting, setPutting] = useState(false);
  const [open, setOpen] = useState(false);
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
            enqueueSnackbar(response.data.message);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      });
  };

  const putGift = () => {
    setPutting(true);
    api({
      method: "POST",
      url: `gifts/putGift`,
      data: {
        userId: props.userId,
        giftId: selectedItem,
      },
    })
      .then((response) => {
        setPutting(false);
        if (response.data.success) {
          setSelectedItem(null);
          setBalance(response.data.newBalance);
          enqueueSnackbar(t("alerts.giftSent"), { variant: "success" });
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message);
          }
        }
      })
      .catch((error) => {
        setPutting(false);
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
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
            <div className={classes.title}>
              <Typography variant="h6">
                {t("commons.sendAGift", { name: profile?.username })}
              </Typography>
              <Typography variant="body2">
                {!balance || balance === 0
                  ? t("alerts.yourBalanceIsNull")
                  : t("alerts.yourBalance", { balance: balance })}
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <IconButton onClick={() => setDialogStore(true)}>
                <img
                  src={`${process.env.REACT_APP_CDN}/ui/coin.png`}
                  style={{ width: 24, height: 24 }}
                  alt="coin"
                />
              </IconButton>
              <div style={{ width: 10 }} />
              <Button
                disabled={!selectedItem || putting ? true : false}
                variant="contained"
                color="secondary"
                onClick={() => putGift()}
              >
                {putting ? (
                  <CircularProgress size={25} color="secondary" />
                ) : (
                  t("buttons.send")
                )}
              </Button>
            </div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <ScrollContainer className={classes.items} hideScrollbars={false}>
            {items?.map((el) => {
              return (
                <>
                  <div style={{ flexGrow: 0, marginRight: 10 }}>
                    <Gift
                      id={el?._id}
                      selected={el?._id === selectedItem}
                      onClick={setSelectedItem}
                      data={el}
                      balance={balance}
                    />
                  </div>
                </>
              );
            })}
          </ScrollContainer>
        </div>
      </SwipeableDrawer>
      {dialogStore && <DialogStore open={setDialogStore} />}
    </>
  );
};

export default memo(AtomsInputsGiftButton);
