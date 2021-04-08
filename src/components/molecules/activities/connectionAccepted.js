import React, { memo, useState } from "react";
import { CardActionArea } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import moment from "moment";
import { HowToRegRounded as ActivityIcon } from "@material-ui/icons";

import i18n from "../../../i18n";
import Picture from "../../atoms/display/picture";
import Typography from "../../atoms/display/typography";
import DialogProfile from "../../templates/dialogs/profile";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    overflow: "hidden",
    cursor: "pointer",
  },
  content: {
    width: "100%",
    paddingLeft: 15,
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
  status: {
    position: "absolute",
    backgroundColor: theme.palette.status[0],
    left: 46,
    top: 19,
    width: 16,
    height: 16,
    borderRadius: 8,
    border: `3px solid ${theme.palette.primary.main}`,
  },
  icon: {
    minWidth: 54,
    maxWidth: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const MoleculesActivitiesConnectionAccepted = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [dialogProfile, setDialogProfile] = useState(false);

  const parsePicture = () => {
    if (props.data.user[0].picture) {
      return `${process.env.REACT_APP_CDN}/pictures/profiles/${props.data.user[0].picture}`;
    } else {
      return "";
    }
  };

  return (
    <>
      <CardActionArea
        className={classes.root}
        onClick={() => setDialogProfile(true)}
      >
        <div>
          <Picture width={54} height={54} src={parsePicture()} />
          {props.data.user[0].online && <div className={classes.status}></div>}
        </div>
        <div className={classes.content}>
          <Typography variant="body1">
            {props.data.user[0].username},{" "}
            {moment().diff(props.data.user[0].birthday, "years")}
          </Typography>
          <Typography variant="body2">
            {props.data.type[0]?.name[i18n.language]}
          </Typography>
        </div>
        <div className={classes.icon}>
          <ActivityIcon style={{ color: theme.palette.text.secondary }} />
        </div>
      </CardActionArea>
      {dialogProfile && (
        <DialogProfile data={props.data.user[0]} open={setDialogProfile} />
      )}
    </>
  );
};

export default memo(MoleculesActivitiesConnectionAccepted);
