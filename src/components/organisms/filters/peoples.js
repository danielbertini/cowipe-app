import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@material-ui/core/styles";
import { Menu, MenuItem, CircularProgress } from "@material-ui/core";
import { FilterListRounded as FilterIcon } from "@material-ui/icons";

import IconButton from "../../atoms/inputs/iconButton";

const OrganismsFiltersPeoples = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickOptionsMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        disabled={props.loading}
        onClick={(e) => {
          handleClickOptionsMenu(e);
        }}
      >
        {props.loading ? (
          <CircularProgress
            size={18}
            style={{ color: theme.palette.text.primary }}
          />
        ) : (
          <FilterIcon />
        )}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={(e) => {
          handleCloseOptionsMenu(e);
        }}
        // onClose={handleCloseOptionsMenu}
      >
        <MenuItem
          disabled={props.filter === 1}
          onClick={() => {
            handleCloseOptionsMenu();
            props.setLoading(true);
            props.setFilter(1);
            props.setSkip(0);
          }}
        >
          {t("panels.people.options.1")}
        </MenuItem>
        <MenuItem
          disabled={props.filter === 2}
          onClick={() => {
            handleCloseOptionsMenu();
            props.setLoading(true);
            props.setFilter(2);
            props.setSkip(0);
          }}
        >
          {t("panels.people.options.2")}
        </MenuItem>
        <MenuItem
          disabled={props.filter === 3}
          onClick={() => {
            handleCloseOptionsMenu();
            props.setLoading(true);
            props.setFilter(3);
            props.setSkip(0);
          }}
        >
          {t("panels.people.options.3")}
        </MenuItem>
        <MenuItem
          disabled={props.filter === 4}
          onClick={() => {
            handleCloseOptionsMenu();
            props.setLoading(true);
            props.setFilter(4);
            props.setSkip(0);
          }}
        >
          {t("panels.people.options.4")}
        </MenuItem>
        <MenuItem
          disabled={props.filter === 5}
          onClick={() => {
            handleCloseOptionsMenu();
            props.setLoading(true);
            props.setFilter(5);
            props.setSkip(0);
          }}
        >
          {t("panels.people.options.5")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(OrganismsFiltersPeoples);
