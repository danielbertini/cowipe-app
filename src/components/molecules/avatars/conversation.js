import React, { memo } from "react";
import { CardActionArea, CircularProgress } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ArrowForwardRounded as RightIcon } from "@material-ui/icons";

import Avatar from "../../molecules/avatars/user";
import Typography from "../../atoms/display/typography";
import IconButton from "../../atoms/inputs/iconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
    borderBottom: `1px solid ${theme.palette.divider}`,
    overflow: "hidden",
    "-webkit-mask-image": "-webkit-radial-gradient(white, black)",
  },
  content: {
    width: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "& > *": {
      overflow: "hidden",
      maxWidth: "100%",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  counter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 9,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[3],
  },
  counterMobile: {
    position: "absolute",
    top: 8,
    right: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: theme.shape.borderRadius / 2,
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[3],
    "& > *": {
      fontSize: theme.typography.fontSize - 4,
    },
  },
}));

const MoleculesAvatarsConversation = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const renderContent = () => {
    return (
      <>
        <Avatar
          status={props.user.status ? 0 : 1}
          src={`${process.env.REACT_APP_CDN}/pictures/profiles/${props.user.picture}`}
        />
        <div style={{ width: 15 }} />
        <div className={classes.content}>
          <Typography variant="body1">{props.user.username}</Typography>
          <Typography variant="body2">{props.lastMessage}</Typography>
        </div>
        {props.counter > 0 && (
          <>
            <div style={{ width: 15 }} />
            <div className={classes.counter}>
              <Typography variant="body2" style={{ color: "#fff" }}>
                {props.counter}
              </Typography>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <CardActionArea className={classes.root} onClick={props.onClick}>
        {renderContent()}
        <div style={{ width: 10 }} />
        <IconButton>
          {props.loading ? (
            <CircularProgress
              size={18}
              style={{ color: theme.palette.text.primary }}
            />
          ) : (
            <RightIcon fontSize="small" />
          )}
        </IconButton>
      </CardActionArea>
    </>
  );
};

export default memo(MoleculesAvatarsConversation);
