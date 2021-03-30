import React, { memo } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";
import { MenuRounded as MenuIcon } from "@material-ui/icons";

import Avatar from "../../atoms/display/avatarCompany";
import IconButton from "../../atoms/inputs/iconButton";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      overflow: "hidden",
      "-webkit-mask-image": "-webkit-radial-gradient(white, black)",
      cursor: "pointer",
      "&:hover": {},
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

  const theme = useTheme();
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
                  style={{
                    width: 44,
                    height: 44,
                  }}
                >
                  {/* <LogoIcon style={{ fontSize: 34, color: "#fff" }} /> */}
                  <img
                    src={`https://cdn.cowipe.com/ui/${
                      theme.palette.type === "dark"
                        ? "logo-dark"
                        : "logo-normal"
                    }.png`}
                    alt="Cowipe"
                    style={{ width: 41, height: 41 }}
                  />
                </Avatar>
                <IconButton onClick={props.close} color="primary">
                  <MenuIcon style={{ color: theme.palette.text.primary }} />
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
                  {/* <LogoIcon style={{ fontSize: 34, color: "#fff" }} /> */}
                  <img
                    src={`https://cdn.cowipe.com/ui/${
                      theme.palette.type === "dark"
                        ? "logo-dark"
                        : "logo-normal"
                    }.png`}
                    alt="Cowipe"
                    style={{ width: 41, height: 41 }}
                  />
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
