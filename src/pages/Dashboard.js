import React, { memo } from "react";
import { Container, Grid } from "@material-ui/core";

import MainMenu from "../components/organisms/menus/mainAuthenticated";
import CardDeck from "../components/templates/panels/cardDeck";
import People from "../components/templates/panels/people";
import Activities from "../components/templates/panels/activities";
import TemplatesPanelsTips from "../components/templates/panels/tips";

const Dashboard = () => {
  return (
    <>
      <MainMenu />
      <Container maxWidth="xl">
        <Grid container direction="row" spacing={2}>
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            {/* <CardDeck />
            <div style={{ height: 16 }} /> */}
            <People />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Activities />
            <div style={{ height: 16 }} />
            <TemplatesPanelsTips />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default memo(Dashboard);
