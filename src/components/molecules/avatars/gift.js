import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { CardActionArea, CircularProgress } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ArrowForwardRounded as RightIcon } from "@material-ui/icons";

import i18n from "../../../i18n";
import Avatar from "../../molecules/avatars/user";
import Typography from "../../atoms/display/typography";
import IconButton from "../../atoms/inputs/iconButton";

const Component = (props) => {
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
  }));

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  const renderContent = () => {
    return (
      <>
        <div
          style={{
            backgroundColor: theme.palette.primary.main,
            boxShadow: theme.shadows[1],
            width: 44,
            minWidth: 44,
            height: 44,
            marginRight: 10,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={`${process.env.REACT_APP_CDN}/ui/gifts/${props.gift?._id}-small.png`}
            alt="gift"
            style={{
              width: "70%",
              height: "70%",
            }}
          />
        </div>
        <Avatar
          status={props.user.status ? 0 : 1}
          src={`${process.env.REACT_APP_CDN}/pictures/profiles/${props.user.picture}`}
        />
        <div style={{ width: 15 }} />
        <div className={classes.content}>
          <Typography variant="body1">{props.user?.username}</Typography>
          <Typography variant="body2">
            {t(
              props.action === "sent"
                ? "commons.sendGiftFrom"
                : "commons.receiveGiftFrom",
              {
                name: props.gift?.name[i18n.language],
              }
            )}
          </Typography>
        </div>
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

export default memo(Component);
