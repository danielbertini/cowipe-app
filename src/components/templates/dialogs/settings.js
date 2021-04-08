import React, { useState, useEffect, useContext, memo } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { useTheme } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import {
  RadioButtonCheckedRounded as CheckBoxCheckedIcon,
  RadioButtonUncheckedRounded as CheckBoxIcon,
} from "@material-ui/icons";

import i18n from "../../../i18n";
import LinearProgress from "../../atoms/feedback/linearProgress";
import DialogTitle from "../dialogs/dialogTitle";
import Typography from "../../atoms/display/typography";
import { CustomThemeContext } from "../../../context/Theme";

const TemplatesDialogsSettings = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [preLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [languageSelected, setLanguageSelected] = useState("");
  const [themeSelected, setThemeSelected] = useState("");
  const { setTheme } = useContext(CustomThemeContext);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setThemeSelected(localStorage?.getItem("appTheme"));
    if (i18n.language) {
      i18n.changeLanguage(i18n.language);
      setLanguageSelected(i18n.language);
    } else {
      if (localStorage) {
        i18n.changeLanguage(localStorage.getItem("i18nextLng"));
        setLanguageSelected(localStorage.getItem("i18nextLng"));
      }
    }
  }, []);

  const renderTabs = () => {
    if (!preLoading) {
      return (
        <>
          <div
            style={{
              backgroundColor: theme.palette.primary.main,
              zIndex: 10,
              boxShadow: theme.shadows[3],
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label={t("translations.changeLanguage")} />
              <Tab label={t("themes.changeTheme")} />
            </Tabs>
          </div>
        </>
      );
    }
  };

  const renderContent = () => {
    if (preLoading) {
      return (
        <>
          <DialogContent style={{ zIndex: 9 }}>
            <LinearProgress />
          </DialogContent>
        </>
      );
    } else {
      return (
        <>
          <DialogContent style={{ zIndex: 9 }}>
            <div hidden={tabValue !== 0}>
              <Grid container direction="row" spacing={2} justify="center">
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <List component="div" disablePadding={true}>
                    <ListItem
                      button
                      onClick={() => {
                        i18n.changeLanguage("es");
                        setLanguageSelected("es");
                      }}
                    >
                      <ListItemIcon>
                        {languageSelected === "es" ? (
                          <CheckBoxCheckedIcon />
                        ) : (
                          <CheckBoxIcon />
                        )}
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("translations.spanish")}
                      </Typography>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        i18n.changeLanguage("en-US");
                        setLanguageSelected("en-US");
                      }}
                    >
                      <ListItemIcon>
                        {languageSelected === "en-US" ? (
                          <CheckBoxCheckedIcon />
                        ) : (
                          <CheckBoxIcon />
                        )}
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("translations.english")}
                      </Typography>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        i18n.changeLanguage("pt-BR");
                        setLanguageSelected("pt-BR");
                      }}
                    >
                      <ListItemIcon>
                        {languageSelected === "pt-BR" ? (
                          <CheckBoxCheckedIcon />
                        ) : (
                          <CheckBoxIcon />
                        )}
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("translations.portuguese")}
                      </Typography>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </div>
            <div hidden={tabValue !== 1}>
              <Grid container direction="row" spacing={2} justify="center">
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <List component="div" disablePadding={true}>
                    <ListItem
                      button
                      onClick={() => {
                        setTheme("dark");
                        setThemeSelected("dark");
                      }}
                    >
                      <ListItemIcon>
                        {themeSelected === "dark" ? (
                          <CheckBoxCheckedIcon />
                        ) : (
                          <CheckBoxIcon />
                        )}
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("themes.dark")}
                      </Typography>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        setTheme("normal");
                        setThemeSelected("normal");
                      }}
                    >
                      <ListItemIcon>
                        {themeSelected === "normal" ? (
                          <CheckBoxCheckedIcon />
                        ) : (
                          <CheckBoxIcon />
                        )}
                      </ListItemIcon>
                      <Typography variant="body1">
                        {t("themes.light")}
                      </Typography>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
        </>
      );
    }
  };

  const renderActions = () => {
    if (!preLoading) {
      return (
        <>
          <div hidden={tabValue !== 0}></div>
          <div hidden={tabValue !== 1}></div>
        </>
      );
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
        open={props.open ? true : false}
        onClose={() => props.open(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          title={t("mainMenu.settings")}
          open={() => props.open(false)}
        />
        {renderTabs()}
        {renderContent()}
        {renderActions()}
      </Dialog>
    </>
  );
};

export default memo(TemplatesDialogsSettings);
