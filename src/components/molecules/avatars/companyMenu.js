import React, { memo } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";
import {
  MenuRounded as MenuIcon,
  ToysRounded as LogoIcon,
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
      overflow: "hidden",
      "-webkit-mask-image": "-webkit-radial-gradient(white, black)",
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
      width: 12,
      height: 12,
      borderRadius: "50%",
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
                <Avatar style={{ width: 44, height: 44 }}>
                  <LogoIcon style={{ fontSize: 34, color: "#fff" }} />
                  {/* <img
                    src="./logo512.png"
                    alt="Cowipe"
                    style={{ width: 44, height: 44 }}
                  /> */}
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
                <Avatar style={{ width: 44, height: 44 }}>
                  <LogoIcon style={{ fontSize: 34, color: "#fff" }} />
                  {/* <img
                    src="./logo512.png"
                    alt="Cowipe"
                    style={{ width: 44, height: 44 }}
                  /> */}
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
