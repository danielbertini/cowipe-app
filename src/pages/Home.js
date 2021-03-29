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
            <Title variant="h1">{"Recursos gratuitos"}</Title>
            <div style={{ height: 15 }} />
            <Typography variant="subtitle2">
              Nossa missão é conectar as pessoas e acreditamso que oferecer
              recursos para isso de forma gratuíta é essencial para criar um
              ambiente mais justo e democrático para todos.
            </Typography>
            <div style={{ height: 15 }} />
            <List component="nav" disablePadding={true}>
              <Divider />
              <ListItem button onClick={() => handleCollapseMenu(0)}>
                <ListItemIcon>
                  <GeolocationIcon />
                </ListItemIcon>
                <ListItemText primary={"Encontre pessoas por perto"} />
                {expandedMenu[0] ? (
                  <ExpandLess style={{ opacity: 0.25 }} />
                ) : (
                  <ExpandMore style={{ opacity: 0.25 }} />
                )}
              </ListItem>
              <Collapse in={expandedMenu[0]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding={true}>
                  <ListItem>
                    <Typography variant="subtitle2" style={{ marginLeft: 40 }}>
                      Encontre pessoas por proximidade ou que cruzaram com você
                      e aproveite as oportunidades que surgem no seu caminho.
                    </Typography>
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
              <ListItem button onClick={() => handleCollapseMenu(1)}>
                <ListItemIcon>
                  <ActivitiesIcon />
                </ListItemIcon>
                <ListItemText primary={"Atividades no seu perfil"} />
                {expandedMenu[1] ? (
                  <ExpandLess style={{ opacity: 0.25 }} />
                ) : (
                  <ExpandMore style={{ opacity: 0.25 }} />
                )}
              </ListItem>
              <Collapse in={expandedMenu[1]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding={true}>
                  <ListItem>
                    <Typography variant="subtitle2" style={{ marginLeft: 40 }}>
                      Saiba tudo que está acontecendo, quem acessou seu perfil,
                      quem solicitou uma conexão e muito mais, tudo em tempo
                      real.
                    </Typography>
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
              <ListItem button onClick={() => handleCollapseMenu(2)}>
                <ListItemIcon>
                  <VisibilityOnIcon />
                </ListItemIcon>
                <ListItemText primary={"Visibilidade do seu perfil"} />
                {expandedMenu[2] ? (
                  <ExpandLess style={{ opacity: 0.25 }} />
                ) : (
                  <ExpandMore style={{ opacity: 0.25 }} />
                )}
              </ListItem>
              <Collapse in={expandedMenu[2]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding={true}>
                  <ListItem>
                    <Typography variant="subtitle2" style={{ marginLeft: 40 }}>
                      Sempre que desejar você pode escolher ficar invisível nas
                      buscas e manter contato apenas com as pessoas que já fez
                      conexão.
                    </Typography>
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
              <ListItem button onClick={() => handleCollapseMenu(3)}>
                <ListItemIcon>
                  <ConversationsIcon />
                </ListItemIcon>
                <ListItemText primary={"Conversas ilimitadas"} />
                {expandedMenu[3] ? (
                  <ExpandLess style={{ opacity: 0.25 }} />
                ) : (
                  <ExpandMore style={{ opacity: 0.25 }} />
                )}
              </ListItem>
              <Collapse in={expandedMenu[3]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding={true}>
                  <ListItem>
                    <Typography variant="subtitle2" style={{ marginLeft: 40 }}>
                      Você pode conversar através no nosso chat assim que a
                      outra pessoa aceitar o pedido de conexão, sem nenhuma
                      limitação.
                    </Typography>
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
              <ListItem button onClick={() => handleCollapseMenu(4)}>
                <ListItemIcon>
                  <PhotoIcon />
                </ListItemIcon>
                <ListItemText primary={"Fotos restritas"} />
                {expandedMenu[4] ? (
                  <ExpandLess style={{ opacity: 0.25 }} />
                ) : (
                  <ExpandMore style={{ opacity: 0.25 }} />
                )}
              </ListItem>
              <Collapse in={expandedMenu[4]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding={true}>
                  <ListItem>
                    <Typography variant="subtitle2" style={{ marginLeft: 40 }}>
                      Você pode definir fotos restritas, assim apenas as pessoas
                      que você aceitar conexão poderão ver as fotos que você
                      marcou como restrita.
                    </Typography>
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
              <ListItem button onClick={() => handleCollapseMenu(5)}>
                <ListItemIcon>
                  <ReservedIcon />
                </ListItemIcon>
                <ListItemText primary={"Modo reservado"} />
                {expandedMenu[5] ? (
                  <ExpandLess style={{ opacity: 0.25 }} />
                ) : (
                  <ExpandMore style={{ opacity: 0.25 }} />
                )}
              </ListItem>
              <Collapse in={expandedMenu[5]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding={true}>
                  <ListItem>
                    <Typography variant="subtitle2" style={{ marginLeft: 40 }}>
                      Ativando o modo reservado, apenas você poderá solicitar
                      uma conexão, isso garante um maior nível de respeito e
                      privacidade.
                    </Typography>
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
            </List>
            <div style={{ height: 20 }} />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Title variant="h1">{"Envie presentes"}</Title>
            <div style={{ height: 15 }} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PagesHome;
