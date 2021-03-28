import React from "react";
import { Container, Grid } from "@material-ui/core";

import MainMenu from "../components/organisms/menus/main";

const PagesHome = () => {
  return (
    <>
      <MainMenu />
      <Container>
        <Grid container direction="row" spacing={20} justify="center">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PagesHome;
