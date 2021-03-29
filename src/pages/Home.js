import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, Grid, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import {
  PlaceRounded as GeolocationIcon,
  RecentActors as ActivitiesIcon,
  ChatRounded as ConversationsIcon,
  PersonAddRounded as ReservedOnIcon,
  VisibilityRounded as VisibilityOnIcon,
} from "@material-ui/icons";

import Typography from "../components/atoms/display/typography";
import MainMenu from "../components/organisms/menus/main";

const PagesHome = () => {
  const useStyles = makeStyles((theme) => ({
    bannerMini: {
      width: "100%",
      overflow: "hidden",
      // borderRadius: theme.shape.borderRadius,
      // backgroundColor: theme.palette.background.panel,
      // boxShadow: theme.shadows[3],
    },
    bannerMiniIcon: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      // backgroundColor: theme.palette.secondary.main,
      padding: 15,
      paddingBottom: 5,
      "& > h6": {
        fontFamily: theme.typography.fontFamilyTitle,
      },
    },
    bannerIconFrame: {
      height: 80,
      width: 80,
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.shadows[3],
      display: "flex",
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      "& > svg": {
        fontSize: 42,
        color: theme.palette.secondary.main,
      },
    },
    bannerContent: {
      padding: 15,
      paddingTop: 5,
      textAlign: "center",
    },
  }));

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <MainMenu />
      <Container>
        <Grid container direction="row" spacing={2} justify="center">
          <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
            <div className={classes.bannerMini}>
              <div className={classes.bannerMiniIcon}>
                <div className={classes.bannerIconFrame}>
                  <GeolocationIcon />
                </div>
                <Typography variant="subtitle1">Geolocalização</Typography>
              </div>
              <div className={classes.bannerContent}>
                <Typography variant="subtitle2">
                  Encontre pessoas por proximidade ou que cruzaram com você e
                  aproveite as oportunidades que surgem no seu caminho.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
            <div className={classes.bannerMini}>
              <div className={classes.bannerMiniIcon}>
                <div className={classes.bannerIconFrame}>
                  <ActivitiesIcon />
                </div>
                <Typography variant="subtitle1">Atividades</Typography>
              </div>
              <div className={classes.bannerContent}>
                <Typography variant="subtitle2">
                  Saiba tudo que está acontecendo, quem acessou seu perfil, quem
                  solicitou uma conexão e muito mais, tudo em tempo real.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
            <div className={classes.bannerMini}>
              <div className={classes.bannerMiniIcon}>
                <div className={classes.bannerIconFrame}>
                  <VisibilityOnIcon />
                </div>
                <Typography variant="subtitle1">Visibilidade</Typography>
              </div>
              <div className={classes.bannerContent}>
                <Typography variant="subtitle2">
                  Sempre que desejar você pode escolher ficar invisível nas
                  buscas e manter as conversas com as pessoas que já fez
                  conexão.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
            <div className={classes.bannerMini}>
              <div className={classes.bannerMiniIcon}>
                <div className={classes.bannerIconFrame}>
                  <ConversationsIcon />
                </div>
                <Typography variant="subtitle1">Chat</Typography>
              </div>
              <div className={classes.bannerContent}>
                <Typography variant="subtitle2">
                  Você pode conversar através no nosso chat assim que a outra
                  pessoa aceitar o pedido de conexão, sem nenhuma limitação.
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PagesHome;
