import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@material-ui/core";
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
          <IconButton
            size="medium"
            color="secondary"
            onClick={() => setDialogTalkWithUs(true)}
          >
            <EmailIcon fontSize="inherit" color="secondary" />
          </IconButton>
        </div>
      </div>
      {dialogTalkWithUs && (
        <TemplatesDialogsTalkWithUs open={setDialogTalkWithUs} />
      )}
    </>
  );
};

export default memo(OrganismsFooterHome);
