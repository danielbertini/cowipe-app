import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  ExpandLessRounded as ExpandLess,
  ExpandMoreRounded as ExpandMore,
  PlaceRounded as GeolocationIcon,
  RecentActors as ActivitiesIcon,
  ChatRounded as ConversationsIcon,
  VisibilityRounded as VisibilityOnIcon,
  PhotoCameraRounded as PhotoIcon,
  PersonAddDisabledRounded as ReservedIcon,
} from "@material-ui/icons";

import Title from "../components/atoms/display/title";
import Typography from "../components/atoms/display/typography";
import MainMenu from "../components/organisms/menus/main";

const PagesHome = () => {
  const useStyles = makeStyles((theme) => ({}));

  const { t } = useTranslation();
  const classes = useStyles();
  const [expandedMenu, setExpandedMenu] = useState(0);

  const handleCollapseMenu = (index) => {
    setExpandedMenu({
      [index]: expandedMenu[index] === true ? false : true,
    });
  };

  return (
    <>
      <MainMenu />
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
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PagesHome;
