import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid, Divider } from "@material-ui/core";

import MoleculesSwitchsLanguage from "../../molecules/switchs/language";
import MoleculesSwitchsTheme from "../../molecules/switchs/theme";
import Typography from "../../atoms/display/typography";

const OrganismsFooterHome = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container style={{ position: "relative", bottom: 0 }}>
        <Grid container direction="row" spacing={2} justify="center">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <div style={{ padding: 20 }}>
              <Divider />
              <div style={{ height: 15 }} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="body1">{t("app.copyright")}</Typography>
                  <Typography variant="body2">{t("app.phrase")}</Typography>
                </div>
                <div>
                  <MoleculesSwitchsLanguage />
                  <MoleculesSwitchsTheme />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default memo(OrganismsFooterHome);
