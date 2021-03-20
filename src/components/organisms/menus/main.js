import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { isMobile } from "react-device-detect";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Collapse,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  PersonRounded as UserIcon,
  NavigateNext as ArrowIcon,
  PersonRounded as ProfileIcon,
  BusinessRounded as CompanyIcon,
  GavelRounded as GavelIcon,
  SettingsRounded as SettingsIcon,
  ExpandLessRounded as ExpandLess,
  ExpandMoreRounded as ExpandMore,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import publicIp from "public-ip";

import { setIP } from "../../../store/ip/ip.actions";

import Typography from "../../atoms/display/typography";
import Avatar from "../../atoms/display/avatar";
import AvatarUser from "../../molecules/avatars/userMenu";
import AvatarCompany from "../../molecules/avatars/companyMenu";
import DialogSettings from "../../templates/dialogs/settings";

const Component = (props) => {
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
    avatar: {
      margin: 0,
      zIndex: 9,
      borderRadius: "50%",
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[3],
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
      backgroundColor: theme.palette.secondary.main,
    },
    drawerMenuRoot: {
      height: "100vh",
    },
    drawerAvatarRoot: {
      width: 250,
      paddingTop: 40,
      paddingBottom: 40,
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
  }));

  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [drawerLeft, setDrawerLeft] = useState(false);
  const [expandedMenuLeft, setExpandedMenuLeft] = useState(0);
  const [drawerRight, setDrawerRight] = useState(false);
  const [expandedMenuRight, setExpandedRight] = useState(0);
  const [dialogSettings, setDialogSettings] = useState(false);
  const [userIp, setUserIp] = useState(false);

  const getClientIp = async () =>
    setUserIp(
      await publicIp.v4({
        fallbackUrls: ["https://ifconfig.co/ip"],
      })
    );

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
          <div className={classes.drawerContent}>
            <div className={classes.drawerAvatarRoot}>
              <Avatar
                style={{ width: 160, height: 160 }}
                onClick={() => setDrawerRight(true)}
              >
                <UserIcon style={{ color: "#fff", fontSize: 80 }} />
              </Avatar>
              <div style={{ height: 10 }} />
              <Typography variant="subtitle1">
                {t("commons.welcome")}
              </Typography>
            </div>
            <div className={classes.drawerMenuMain}>
              <List component="nav" disablePadding={true}>
                <Divider />
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
                    <ListItem button component={RouterLink} to="/signin">
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("mainMenu.signin")}
                      </Typography>
                    </ListItem>
                    <ListItem button component={RouterLink} to="/signup">
                      <ListItemIcon>
                        <ArrowIcon />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("mainMenu.signup")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => setDialogSettings(true)}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("mainMenu.settings")} />
                </ListItem>
                <Divider />
              </List>
            </div>
          </div>
        </SwipeableDrawer>
      </>
    );
  };

  useEffect(() => {
    getClientIp();
    localStorage.removeItem("state");
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    if (userIp) {
      dispatch(setIP(userIp));
    }
  }, [dispatch, userIp]);

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
          <Typography variant="h3">cowipe</Typography>
        </div>
        <div style={{ display: "flex", flexWrap: "nowrap" }}></div>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <AvatarUser onClick={() => setDrawerRight(true)} status={false} />
        </div>
      </div>
      <div style={{ height: isMobile ? 90 : 100, width: "100%" }} />
      {leftDrawer()}
      {rightDrawer()}
      {dialogSettings && <DialogSettings open={setDialogSettings} />}
    </>
  );
};

export default memo(Component);
