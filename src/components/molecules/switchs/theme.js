import React, { memo, useContext } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { Brightness4 as DarkLightModeIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import { CustomThemeContext } from "../../../context/Theme";
import IconButton from "../../../components/atoms/inputs/iconButton";

const MoleculesSwitchsTheme = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuTheme, setMenuTheme] = React.useState(false);
  const { setTheme } = useContext(CustomThemeContext);

  const handleOpenMenuTheme = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuTheme(true);
  };

  return (
    <>
      <IconButton
        size="medium"
        color="secondary"
        onClick={(event) => handleOpenMenuTheme(event)}
      >
        <DarkLightModeIcon fontSize="inherit" color="secondary" />
      </IconButton>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        keepMounted
        open={menuTheme}
        onClose={() => setMenuTheme(false)}
      >
        <MenuItem
          onClick={() => {
            setTheme("dark");
            setMenuTheme(false);
          }}
        >
          {t("themes.dark")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTheme("normal");
            setMenuTheme(false);
          }}
        >
          {t("themes.light")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(MoleculesSwitchsTheme);
