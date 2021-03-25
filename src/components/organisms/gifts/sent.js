import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { DialogActions, DialogContent } from "@material-ui/core";

import i18n from "../../../i18n";
import Typography from "../../atoms/display/typography";

const OrganismsGiftsSent = (props) => {
  const { t } = useTranslation();

  const renderComponent = () => {
    return (
      <>
        <DialogContent></DialogContent>
        <DialogActions
          style={{
            display: "flex",
            flexDirection: "columns",
            justifyContent: "space-between",
          }}
        ></DialogActions>
      </>
    );
  };

  return renderComponent();
};

export default memo(OrganismsGiftsSent);
