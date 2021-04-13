import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid, Divider } from "@material-ui/core";
import { EmailRounded as EmailIcon } from "@material-ui/icons";

import MoleculesSwitchsLanguage from "../../molecules/switchs/language";
import MoleculesSwitchsTheme from "../../molecules/switchs/theme";
import Typography from "../../atoms/display/typography";
import IconButton from "../../atoms/inputs/iconButton";
import TemplatesDialogsTalkWithUs from "../../templates/dialogs/talkWithUs";

const OrganismsFooterHome = () => {
  const { t } = useTranslation();
  const [dialogTalkWithUs, setDialogTalkWithUs] = useState(false);

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
                </div>
                <div>
                  <MoleculesSwitchsLanguage />
                  <MoleculesSwitchsTheme />
                  <IconButton
                    size="medium"
                    color="secondary"
                    onClick={() => setDialogTalkWithUs(true)}
                  >
                    <EmailIcon fontSize="inherit" color="secondary" />
                  </IconButton>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      {dialogTalkWithUs && (
        <TemplatesDialogsTalkWithUs open={setDialogTalkWithUs} />
      )}
    </>
  );
};

export default memo(OrganismsFooterHome);
