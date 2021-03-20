import React, { memo } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";
import {
  MenuRounded as MenuIcon,
  PersonRounded as UserIcon,
} from "@material-ui/icons";

import Avatar from "../../atoms/display/avatar";
import IconButton from "../../atoms/inputs/iconButton";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 44,
      height: 44,
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "50%",
      "-webkit-mask-image": "-webkit-radial-gradient(white, black)",
      overflow: "hidden",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
      "& > div": {
        transition: "all 150ms ease-in-out",
        transform: "translateY(0px)",
      },
      "&:hover > div": {
        transition: "all 150ms ease-in-out",
        transform: "translateY(-44px)",
      },
    },
    rootWithoutMenu: {
      width: 44,
      height: 44,
      backgroundColor: theme.palette.background,
      borderRadius: "50%",
      overflow: "hidden",
    },
  }));

  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: theme.palette.status[props.status],
      width: 16,
      height: 16,
      borderRadius: "50%",
      border:
        props.status === false
          ? `0px solid rgba(0,0,0,0)`
          : `3px solid ${theme.palette.primary.main}`,
    },
  }))(Badge);

  const classes = useStyles();

  const renderWithMenu = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={props.onClick}
        >
          <StyledBadge
            overlap="circle"
            variant="dot"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <div className={classes.root}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Avatar
                  src={props.src ? props.src : ""}
                  style={{ width: 44, height: 44 }}
                >
                  <UserIcon style={{ color: "#fff" }} />
                </Avatar>
                <IconButton onClick={props.close} color="primary">
                  <MenuIcon style={{ color: "#fff" }} />
                </IconButton>
              </div>
            </div>
          </StyledBadge>
        </div>
      </>
    );
  };

  const renderWithoutMenu = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={props.onClick}
        >
          <StyledBadge
            overlap="circle"
            variant="dot"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <div className={classes.rootWithoutMenu}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Avatar
                  src={props.src ? props.src : ""}
                  style={{ width: 44, height: 44 }}
                >
                  <UserIcon style={{ color: "#fff" }} />
                </Avatar>
              </div>
            </div>
          </StyledBadge>
        </div>
      </>
    );
  };

  return props.withoutMenu ? renderWithoutMenu() : renderWithMenu();
};

export default memo(Component);
