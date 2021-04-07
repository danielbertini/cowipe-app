import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@material-ui/core";
import {
  InfoRounded as InfoIcon,
  ExpandLessRounded as ExpandLess,
  ExpandMoreRounded as ExpandMore,
  PlaceRounded as GeolocationIcon,
  RecentActors as ActivitiesIcon,
  ChatRounded as ConversationsIcon,
  VisibilityRounded as VisibilityOnIcon,
  PhotoCameraRounded as PhotoIcon,
  PersonAddDisabledRounded as ReservedIcon,
} from "@material-ui/icons";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import ReactGA from "react-ga";

import OrganismsFooterHome from "../components/organisms/footer/home";
import Title from "../components/atoms/display/title";
import Button from "../components/atoms/inputs/button";
import Typography from "../components/atoms/display/typography";
import MainMenu from "../components/organisms/menus/main";

const PagesHome = () => {
  const useStyles = makeStyles((theme) => ({
    banner: {
      marginTop: -28,
      marginBottom: 28,
      width: "100%",
      height: 600,
      backgroundColor: "#000",
    },
    bannerPicture: {
      width: "100%",
      height: 600,
      opacity: 0.3,
    },
    bannerFrame: {
      position: "relative",
      top: -600,
      width: "100%",
      height: 600,
      background: `linear-gradient(to top, ${
        theme.palette.background.default
      } 0%, rgba(${
        theme.palette.type === "dark" ? "143,7,255" : "253,50,89"
      },.6) 100%)`,
    },
    bannerContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      position: "relative",
      top: -1200,
      height: 600,
      width: "100%",
      textAlign: "left",
    },
  }));

  const { t } = useTranslation();
  const classes = useStyles();
  const [expandedMenu, setExpandedMenu] = useState(0);
  const [expandedMenuGifts, setExpandedMenuGifts] = useState(0);
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  useEffect(() => {
    ReactGA.pageview("/home");
  }, []);

  const handleCollapseMenu = (index) => {
    setExpandedMenu({
      [index]: expandedMenu[index] === true ? false : true,
    });
  };

  const handleCollapseMenuGifts = (index) => {
    setExpandedMenuGifts({
      [index]: expandedMenuGifts[index] === true ? false : true,
    });
  };

  return (
    <>
      <MainMenu />
      <div className={classes.banner}>
        <AutoplaySlider
          play={true}
          interval={3000}
          className={classes.bannerPicture}
          bullets={false}
          organicArrows={false}
          buttons={false}
        >
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-1.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-2.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-3.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-4.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-5.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-6.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-7.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-8.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-9.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-10.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-11.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-12.jpg`} />
          <div data-src={`${process.env.REACT_APP_CDN}/ui/home/home-13.jpg`} />
        </AutoplaySlider>
        <div className={classes.bannerFrame}></div>
        <div className={classes.bannerContent}>
          <Container>
            <Grid container direction="row" spacing={2} justify="center">
              <Grid item xl={4} lg={4} md={6} sm={8} xs={12}>
                <div style={{ padding: 20 }}>
                  <Typography variant="h1" style={{ marginBottom: 0 }}>
                    {t("home.banner.title")}
                  </Typography>
                  <Typography variant="subtitle2" style={{ marginBottom: 25 }}>
                    {t("home.banner.description")}
                  </Typography>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    component={RouterLink}
                    to="/signin"
                    style={{ marginBottom: 15 }}
                    fullWidth
                  >
                    {t("mainMenu.signin")}
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    color="secondary"
                    component={RouterLink}
                    to="/signup"
                    fullWidth
                  >
                    {t("mainMenu.signup")}
                  </Button>
                </div>
              </Grid>
              <Grid item xl={8} lg={8} md={6} sm={4} xs={12}></Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div style={{ height: isMobile ? 0 : 20 }} />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <Container>
        <Grid container direction="row" spacing={2} justify="center">
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <div style={{ padding: 20 }}>
              <Title variant="h1">{t("home.resources.title")}</Title>
              <div style={{ height: 15 }} />
              <Typography variant="subtitle2">
                {t("home.resources.subtitle")}
              </Typography>
              <div style={{ height: 15 }} />
              <List component="nav" disablePadding={true}>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenu(0)}>
                  <ListItemIcon>
                    <GeolocationIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home.resources.item1.title")} />
                  {expandedMenu[0] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse in={expandedMenu[0]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 40 }}
                      >
                        {t("home.resources.item1.description")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenu(1)}>
                  <ListItemIcon>
                    <ActivitiesIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home.resources.item2.title")} />
                  {expandedMenu[1] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse in={expandedMenu[1]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 40 }}
                      >
                        {t("home.resources.item2.description")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenu(2)}>
                  <ListItemIcon>
                    <VisibilityOnIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home.resources.item3.title")} />
                  {expandedMenu[2] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse in={expandedMenu[2]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 40 }}
                      >
                        {t("home.resources.item3.description")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenu(3)}>
                  <ListItemIcon>
                    <ConversationsIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home.resources.item4.title")} />
                  {expandedMenu[3] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse in={expandedMenu[3]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 40 }}
                      >
                        {t("home.resources.item4.description")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenu(4)}>
                  <ListItemIcon>
                    <PhotoIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home.resources.item5.title")} />
                  {expandedMenu[4] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse in={expandedMenu[4]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 40 }}
                      >
                        {t("home.resources.item5.description")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenu(5)}>
                  <ListItemIcon>
                    <ReservedIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home.resources.item6.title")} />
                  {expandedMenu[5] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse in={expandedMenu[5]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 40 }}
                      >
                        {t("home.resources.item6.description")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
              </List>
            </div>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <div style={{ padding: 20 }}>
              <Title variant="h1">{t("home.gifts.title")}</Title>
              <div style={{ height: 15 }} />
              <Typography variant="subtitle2">
                {t("home.gifts.subtitle")}
              </Typography>
              <div style={{ height: 15 }} />
              <List component="nav" disablePadding={true}>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenuGifts(0)}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home.gifts.item1.title")} />
                  {expandedMenuGifts[0] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse
                  in={expandedMenuGifts[0]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 40 }}
                      >
                        {t("home.gifts.item1.description")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenuGifts(1)}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home.gifts.item2.title")} />
                  {expandedMenuGifts[1] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse
                  in={expandedMenuGifts[1]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 40 }}
                      >
                        {t("home.gifts.item2.description")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={() => handleCollapseMenuGifts(2)}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home.gifts.item3.title")} />
                  {expandedMenuGifts[2] ? (
                    <ExpandLess style={{ opacity: 0.25 }} />
                  ) : (
                    <ExpandMore style={{ opacity: 0.25 }} />
                  )}
                </ListItem>
                <Collapse
                  in={expandedMenuGifts[2]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding={true}>
                    <ListItem>
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: 40 }}
                      >
                        {t("home.gifts.item3.description")}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
              </List>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div style={{ height: 70 }} />
      <OrganismsFooterHome />
    </>
  );
};

export default PagesHome;
