import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@material-ui/core";

import MoleculesSwitchsLanguage from "../../molecules/switchs/language";
import MoleculesSwitchsTheme from "../../molecules/switchs/theme";
import Typography from "../../atoms/display/typography";

const OrganismsFooterHome = () => {
  const { t } = useTranslation();

  return (
    <>
      <Divider />
      <div style={{ height: 15 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="body1" gutterBottom>
            {t("app.copyright")}
          </Typography>
          <Typography variant="body2">{t("alerts.legal")}</Typography>
        </div>
        <div style={{ height: 15 }} />
        <div>
          <MoleculesSwitchsLanguage />
          <MoleculesSwitchsTheme />
        </div>
      </div>
    </>
  );
};

export default memo(OrganismsFooterHome);
