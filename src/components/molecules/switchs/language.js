import React, { memo } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { LanguageRounded as LanguageIcon } from "@material-ui/icons";

import i18n from "../../../i18n";
import IconButton from "../../../components/atoms/inputs/iconButton";

const Component = ({ t }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuLanguage, setMenuLanguage] = React.useState(false);

  const handleOpenMenuLanguage = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuLanguage(true);
  };

  return (
    <>
      <IconButton
        size="medium"
        color="secondary"
        onClick={(event) => handleOpenMenuLanguage(event)}
      >
        <LanguageIcon fontSize="inherit" color="secondary" />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={menuLanguage}
        onClose={() => setMenuLanguage(false)}
      >
        <MenuItem
          onClick={() => {
            i18n.changeLanguage("eng", () => setMenuLanguage(false));
          }}
        >
          {t("translations.english")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            i18n.changeLanguage("pt", () => setMenuLanguage(false));
          }}
        >
          {t("translations.portuguese")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(Component);
