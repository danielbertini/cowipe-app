import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { geolocated } from "react-geolocated";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { isMobile } from "react-device-detect";
import useSound from "use-sound";
import publicIp from "public-ip";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Collapse,
  Badge,
  Switch,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import ReactGA from "react-ga";

import {
  ChatRounded as ConversationsIcon,
  PersonRounded as UserIcon,
  NavigateNext as ArrowIcon,
  PersonRounded as ProfileIcon,
  BusinessRounded as CompanyIcon,
  TuneRounded as PreferencesIcon,
  GavelRounded as GavelIcon,
  ExitToAppRounded as ExitIcon,
  SettingsRounded as SettingsIcon,
  EditRounded as PictureIcon,
  VisibilityRounded as VisibilityOnIcon,
  VisibilityOffRounded as VisibilityOffIcon,
  VolumeUpRounded as SoundOnIcon,
  VolumeOffRounded as SoundOffIcon,
  ExpandLessRounded as ExpandLess,
  ExpandMoreRounded as ExpandMore,
  PersonAddRounded as ReservedOnIcon,
  PersonAddDisabledRounded as ReservedOffIcon,
  VpnKeyRounded as MyAccountIcon,
  CardGiftcardRounded as GiftIcon,
  StorefrontRounded as ShoppingIcon,
} from "@material-ui/icons";

import { setIP } from "../../../store/ip/ip.actions";
import { setOnline } from "../../../store/online/online.actions";
import { setLocation } from "../../../store/location/location.actions";
import { setPreferences } from "../../../store/preferences/preferences.actions";
import { setUser } from "../../../store/user/user.actions";

import api from "../../../services/api";
import StoreContext from "../../../context/Context";
import SocketContext from "../../../context/SocketContext";
import Typography from "../../atoms/display/typography";
import Avatar from "../../atoms/display/avatar";
import CircularProgress from "../../atoms/feedback/circularProgress";
import IconButton from "../../atoms/inputs/iconButton";
import AlertDialog from "../../atoms/feedback/alertDialog";
import AvatarUser from "../../molecules/avatars/userMenu";
import AvatarCompany from "../../molecules/avatars/companyMenu";
import DialogRegistrationData from "../../templates/dialogs/registrationData";
import DialogRelationship from "../../templates/dialogs/relationship";
import DialogAppearance from "../../templates/dialogs/appearance";
import DialogSettings from "../../templates/dialogs/settings";
import DialogPictures from "../../templates/dialogs/pictures";
import DialogConversations from "../../templates/dialogs/conversations";
import DialogStore from "../../templates/dialogs/store";
import DialogGifts from "../../templates/dialogs/gifts";
import messageSound from "../../../sounds/message.mp3";

const OrganismsMenusMainAuthenticated = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      zIndex: 1000,
      position: "fixed",
      width: "100vw",
      height: 72,
      paddingLeft: isMobile ? 15 : 25,
      paddingRight: isMobile ? 15 : 25,
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.shadows[3],
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "nowrap",
    },
    logoRoot: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    logoBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.secondary.main,
      width: 42,
      height: 42,
      borderRadius: "50%",
      marginRight: 6,
    },
    avatarRoot: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexFlow: "column",
      paddingTop: 30,
      paddingBottom: 20,
    },
    pictureIconRoot: {
      position: "relative",
      marginBottom: -42,
      marginLeft: 120,
      zIndex: 10,
      width: 42,
      height: 42,
      borderRadius: "50%",
      boxShadow: theme.shadows[3],
    },
    drawerMenuRoot: {
      height: "100vh",
    },
    drawerAvatarRoot: {
      width: 250,
      paddingTop: 30,
      paddingBottom: 30,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    drawerMenu: {
      width: 250,
      display: "flex",
      flexDirection: "row",
      height: "100%",
    },
    drawerContent: {},
    drawerMenuHeader: {
      height: 70,
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      paddingLeft: 10,
    },
    drawerMenuMain: {
      width: "100%",
      position: "relative",
      overflowY: "auto",
    },
    drawerMenuHeaderLeft: {
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    headerIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: 22,
    },
  }));

  const theme = useTheme();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { token, setToken } = useContext(StoreContext);
  const { socket } = useContext(SocketContext);
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.activeRoom);
  const preferences = useSelector((state) => state.preferences);
  const online = useSelector((state) => state.online);
  const user = useSelector((state) => state.user);
  const [drawerLeft, setDrawerLeft] = useState(false);
  const [drawerRight, setDrawerRight] = useState(false);
  const [dialogRegistrationData, setDialogRegistrationData] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [dialogRelationship, setDialogRelationship] = useState(false);
  const [dialogAppearance, setDialogAppearance] = useState(false);
  const [dialogSettings, setDialogSettings] = useState(false);
  const [dialogPictures, setDialogPictures] = useState(false);
  const [dialogConversations, setDialogConversations] = useState(false);
  const [dialogStore, setDialogStore] = useState(false);
  const [dialogGifts, setDialogGifts] = useState(false);
  const [preloadingProfile, setPreloadingProfile] = useState(false);
  const [expandedMenuLeft, setExpandedMenuLeft] = useState(0);
  const [expandedMenuRight, setExpandedRight] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(false);
  const [newGift, setNewGift] = useState(false);
  const [playMessageSound] = useSound(messageSound);
  const [userIp, setUserIp] = useState(false);

  api.defaults.headers.common["Authorization"] = token;

  const getClientIp = async () =>
    setUserIp(
      await publicIp.v4({
        fallbackUrls: ["https://ifconfig.co/ip"],
      })
    );

  const checkUnreadMessages = useCallback(() => {
    api({
      method: "GET",
      url: `connections/unreadsByUser`,
    }).then((response) => {
      if (response.data.success) {
        if (response.data.result > 0) {
          setUnreadMessages(true);
        }
      }
    });
  }, []);

  const updateLocation = useCallback((lat, lng) => {
    api({
      method: "PUT",
      url: `user/updateLocation`,
      data: {
        lat: lat,
        lng: lng,
      },
    }).then((response) => {
      if (response.data.success) {
        if (response.data.result > 0) {
          setUnreadMessages(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    ReactGA.event({
      category: "/dashboard",
      action: `USERNAME: ${user.username}`,
    });
  }, [user.username]);

  useEffect(() => {
    if (userIp) {
      dispatch(setIP(userIp));
    }
  }, [dispatch, userIp]);

  useEffect(() => {
    getClientIp();
  }, []);

  useEffect(() => {
    checkUnreadMessages();
  }, [checkUnreadMessages]);

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(setOnline(true));
    });
    socket.on("disconnect", () => {
      dispatch(setOnline(false));
    });
    return () => socket.disconnect();
  }, [dispatch, socket]);

  useEffect(() => {
    socket.on("newGift", () => {
      preferences?.sound && playMessageSound();
      setNewGift(true);
    });
  }, [playMessageSound, preferences?.sound, socket]);

  useEffect(() => {
    if (!dialogConversations) {
      socket.on("message", (data) => {
        if (data.room !== activeRoom) {
          preferences?.sound && playMessageSound();
          setUnreadMessages(true);
        }
      });
    } else {
      socket.off("message");
    }
    return () => socket.off("message");
  }, [
    activeRoom,
    dialogConversations,
    playMessageSound,
    preferences.sound,
    socket,
  ]);

  useEffect(() => {
    if (!props.isGeolocationAvailable) {
      dispatch(
        setLocation({
          message: t("alerts.isGeolocationAvailable"),
          lat: null,
          lng: null,
        })
      );
    } else if (!props.isGeolocationEnabled) {
      dispatch(
        setLocation({
          message: t("alerts.isGeolocationEnabled"),
          lat: null,
          lng: null,
        })
      );
    } else {
      if (props.coords) {
        updateLocation(props.coords.latitude, props.coords.longitude);
        dispatch(
          setLocation({
            message: "",
            lat: props.coords.latitude,
            lng: props.coords.longitude,
          })
        );
      } else {
        dispatch(
          setLocation({
            message: t("alerts.isGeolocationCoordsUnavailable"),
            lat: null,
            lng: null,
          })
        );
      }
    }
  }, [
    props.isGeolocationAvailable,
    props.isGeolocationEnabled,
    props.coords,
    dispatch,
    t,
    updateLocation,
  ]);

  const EditBadge = withStyles((theme) => ({
    badge: {
      border: `3px solid ${theme.palette.primary.main}`,
      borderRadius: 22,
      right: 22,
      top: 22,
      width: 44,
      height: 44,
    },
  }))(Badge);

  const NotificationBadge = withStyles((theme) => ({
    badge: {
      display: unreadMessages ? "block" : "none",
      backgroundColor: theme.palette.status[1],
      width: 16,
      height: 16,
      borderRadius: "50%",
      border: `3px solid ${theme.palette.primary.main}`,
    },
  }))(Badge);

  const NewGiftBadge = withStyles((theme) => ({
    badge: {
      display: newGift ? "block" : "none",
      backgroundColor: theme.palette.status[1],
      width: 16,
      height: 16,
      borderRadius: "50%",
      border: `3px solid ${theme.palette.primary.main}`,
    },
  }))(Badge);

  const soundTogglerHandler = () => {
    dispatch(
      setPreferences({
        ...preferences,
        sound: preferences.sound ? false : true,
      })
    );
  };

  const visibilityTogglerHandler = () => {
    dispatch(
      setPreferences({
        ...preferences,
        visibility: preferences.visibility ? false : true,
      })
    );
  };

  const reservedTogglerHandler = () => {
    dispatch(
      setPreferences({
        ...preferences,
        reserved: preferences.reserved ? false : true,
      })
    );
  };

  const signout = () => {
    setToken(null);
    localStorage.removeItem("state");
    localStorage.removeItem("token");
  };

  const handleCollapseMenuLeft = (index) => {
    setExpandedMenuLeft({
      [index]: expandedMenuLeft[index] === true ? false : true,
    });
  };

  const handleCollapseMenuRight = (index) => {
    setExpandedRight({
      [index]: expandedMenuRight[index] === true ? false : true,
    });
  };

  const leftDrawer = () => {
    return (
      <>
        <SwipeableDrawer
          className={classes.drawerMenuRoot}
          anchor="left"
          open={drawerLeft ? drawerLeft : false}
          onClose={() => setDrawerLeft(false)}
          onOpen={() => setDrawerLeft(true)}
        >
          <div className={classes.drawerMenu}>
            <div className={classes.drawerMenuMain}>
              <List component="nav" disablePadding={true}>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenuLeft(0)}>
                  <ListItemIcon>
                    <CompanyIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("mainMenu.company")} />
                  {expandedMenuLeft[0] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse in={expandedMenuLeft[0]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding={true}>
                    <ListItem button>
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("mainMenu.workWithUs")}
                      </Typography>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("mainMenu.talkWithUs")}
                      </Typography>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("mainMenu.security")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenuLeft(1)}>
                  <ListItemIcon>
                    <GavelIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("mainMenu.legal")} />
                  {expandedMenuLeft[1] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse in={expandedMenuLeft[1]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding={true}>
                    <ListItem button>
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("mainMenu.privacy")}
                      </Typography>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("mainMenu.terms")}
                      </Typography>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("mainMenu.cookies")}
                      </Typography>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("mainMenu.rules")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
              </List>
            </div>
          </div>
        </SwipeableDrawer>
      </>
    );
  };

  const calculateSize = (img, maxWidth, maxHeight) => {
    let width = img.width;
    let height = img.height;
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  };

  const handleSelectedFiles = (event) => {
    setPreloadingProfile(true);
    const blobURL = URL.createObjectURL(event.target.files[0]);
    const preview = new Image();
    preview.src = blobURL;
    preview.onerror = (error) => {
      URL.revokeObjectURL(blobURL);
      alert(error);
    };
    preview.onload = () => {
      const [newWidth, newHeight] = calculateSize(preview, 1000, 1000);
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(preview, 0, 0, newWidth, newHeight);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(blobURL);
          const id = uuid();
          const data = new FormData();
          data.append("file", blob, id);
          api
            .post("pictures/profile", data)
            .then((response) => {
              if (response.data.success) {
                dispatch(setUser(response.data.document));
              } else {
                if (response.data.message) {
                  enqueueSnackbar(response.data.message, { variant: "error" });
                }
              }
              setPreloadingProfile(false);
            })
            .catch((error) => {
              setPreloadingProfile(false);
            });
        },
        "image/jpeg",
        1
      );
    };
  };

  const rightDrawer = () => {
    return (
      <>
        <SwipeableDrawer
          className={classes.drawerMenuRoot}
          anchor="right"
          open={drawerRight ? drawerRight : false}
          onClose={() => setDrawerRight(false)}
          onOpen={() => setDrawerRight(true)}
        >
          {!preloadingProfile && (
            <input
              accept="image/*"
              type="file"
              id="profile-picture-button-file"
              style={{ display: "none" }}
              onChange={handleSelectedFiles}
            />
          )}

          <div className={classes.drawerContent}>
            <div className={classes.drawerAvatarRoot}>
              <EditBadge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                badgeContent={
                  <label htmlFor="profile-picture-button-file">
                    <IconButton
                      style={{ width: 36, height: 36 }}
                      component="span"
                      disabled={preloadingProfile}
                    >
                      <PictureIcon style={{ color: "#fff", fontSize: 18 }} />
                    </IconButton>
                  </label>
                }
                color="secondary"
              >
                <Avatar
                  style={{
                    width: 160,
                    height: 160,
                  }}
                  src={
                    preloadingProfile
                      ? ""
                      : `${process.env.REACT_APP_CDN}/pictures/profiles/${user.picture}-small`
                  }
                >
                  {preloadingProfile ? (
                    <CircularProgress
                      size={80}
                      thickness={1}
                      style={{ color: "#fff" }}
                    />
                  ) : (
                    <UserIcon style={{ color: "#fff", fontSize: 80 }} />
                  )}
                </Avatar>
              </EditBadge>
              <div style={{ height: 10 }} />
              <Typography
                variant="subtitle1"
                style={{
                  width: "80%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {user.username}
              </Typography>
            </div>
            <div className={classes.drawerMenuMain}>
              <Divider />
              <List component="nav" disablePadding={true}>
                <ListItem button onClick={() => handleCollapseMenuRight(0)}>
                  <ListItemIcon>
                    <ProfileIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("mainMenu.profile")} />
                  {expandedMenuRight[0] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse
                  in={expandedMenuRight[0]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding={true}>
                    <ListItem button onClick={() => setDialogPictures(true)}>
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("commons.myPictures")}
                      </Typography>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => setDialogRelationship(true)}
                    >
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("commons.relationship")}
                      </Typography>
                    </ListItem>
                    <ListItem button onClick={() => setDialogAppearance(true)}>
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("commons.appearance")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenuRight(2)}>
                  <ListItemIcon>
                    <PreferencesIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("mainMenu.preferences")} />
                  {expandedMenuRight[2] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse
                  in={expandedMenuRight[2]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <ListItemIcon>
                        {preferences.sound === true ? (
                          <SoundOnIcon />
                        ) : (
                          <SoundOffIcon />
                        )}
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("commons.sound")}
                      </Typography>
                      <ListItemSecondaryAction>
                        <Switch
                          name="sounds"
                          color="secondary"
                          onChange={soundTogglerHandler}
                          checked={preferences.sound}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <ListItemIcon>
                        {preferences.visibility === true ? (
                          <VisibilityOnIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("commons.visibility")}
                      </Typography>
                      <ListItemSecondaryAction>
                        <Switch
                          name="visibility"
                          color="secondary"
                          onChange={visibilityTogglerHandler}
                          checked={preferences.visibility}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <ListItemIcon>
                        {preferences.reserved === true ? (
                          <ReservedOffIcon />
                        ) : (
                          <ReservedOnIcon />
                        )}
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("commons.reserved")}
                      </Typography>
                      <ListItemSecondaryAction>
                        <Switch
                          name="visibility"
                          color="secondary"
                          onChange={reservedTogglerHandler}
                          checked={preferences.reserved}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem
                  button
                  onClick={() => setDialogRegistrationData(true)}
                >
                  <ListItemIcon>
                    <MyAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("mainMenu.myAccount")} />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setDialogSettings(true)}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("mainMenu.settings")} />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setAlertDialogOpen(true)}>
                  <ListItemIcon>
                    <ExitIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("mainMenu.signout")} />
                </ListItem>
                <Divider />
              </List>
            </div>
          </div>
        </SwipeableDrawer>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Helmet>
      <div className={classes.root}>
        <div
          style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}
        >
          <AvatarCompany onClick={() => setDrawerLeft(true)} />
          <div style={{ width: 12 }} />
        </div>
        <div style={{ display: "flex", flexWrap: "nowrap" }}></div>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <IconButton
            onClick={() => {
              setDialogStore(true);
            }}
          >
            <ShoppingIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setNewGift(false);
              setDialogGifts(true);
            }}
          >
            <NewGiftBadge
              overlap="circle"
              variant="dot"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <GiftIcon />
            </NewGiftBadge>
          </IconButton>
          <IconButton
            onClick={() => {
              setUnreadMessages(false);
              setDialogConversations(true);
            }}
          >
            <NotificationBadge
              overlap="circle"
              variant="dot"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <ConversationsIcon />
            </NotificationBadge>
          </IconButton>
          <div style={{ width: 10 }} />
          <AvatarUser
            onClick={() => setDrawerRight(true)}
            status={online ? 0 : 1}
            src={`${process.env.REACT_APP_CDN}/pictures/profiles/${user.picture}-small`}
          />
        </div>
      </div>
      <div style={{ height: isMobile ? 90 : 100, width: "100%" }} />
      {leftDrawer()}
      {rightDrawer()}
      {dialogRegistrationData && (
        <DialogRegistrationData open={setDialogRegistrationData} />
      )}
      {dialogRelationship && (
        <DialogRelationship open={setDialogRelationship} />
      )}
      {dialogAppearance && <DialogAppearance open={setDialogAppearance} />}
      {dialogSettings && <DialogSettings open={setDialogSettings} />}
      {dialogPictures && <DialogPictures open={setDialogPictures} />}
      {dialogConversations && (
        <DialogConversations open={setDialogConversations} />
      )}
      {dialogStore && <DialogStore open={setDialogStore} />}
      {dialogGifts && <DialogGifts open={setDialogGifts} />}
      {alertDialogOpen && (
        <AlertDialog
          open={alertDialogOpen}
          title={t("commons.warning")}
          text={t("alerts.endSession")}
          handleClose={setAlertDialogOpen}
          handleAgree={signout}
        />
      )}
    </>
  );
};

export default memo(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity,
    },
    watchPosition: false,
    userDecisionTimeout: null,
  })(OrganismsMenusMainAuthenticated)
);
