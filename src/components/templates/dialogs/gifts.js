import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { useTheme } from "@material-ui/core/styles";
import { Dialog, Tabs, Tab } from "@material-ui/core";

import OrganismsGiftsSent from "../../organisms/gifts/sent";
import OrganismsGiftsReceived from "../../organisms/gifts/received";
import DialogTitle from "../dialogs/dialogTitle";

const TemplatesDialogsGifts = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTabs = () => {
    return (
      <>
        <div
          style={{
            backgroundColor: theme.palette.primary.main,
            zIndex: 9,
            boxShadow: theme.shadows[3],
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label={t("dialogs.gifts.tab1.title")} />
            <Tab label={t("dialogs.gifts.tab2.title")} />
          </Tabs>
        </div>
      </>
    );
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
        open={props.open ? true : false}
        onClose={() => {
          props.open(false);
        }}
      >
        <DialogTitle
          title={t("dialogs.gifts.title")}
          style={{ zIndex: 9 }}
          open={() => {
            props.open(false);
          }}
        />
        {renderTabs()}
        <OrganismsGiftsReceived display={tabValue === 0} />
        <OrganismsGiftsSent display={tabValue === 1} />
      </Dialog>
    </>
  );
};

export default memo(TemplatesDialogsGifts);
