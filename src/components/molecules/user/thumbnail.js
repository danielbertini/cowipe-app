import React, { memo, useState } from "react";
import { CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import Picture from "../../atoms/display/picture";
import Typography from "../../atoms/display/typography";
import DialogProfile from "../../templates/dialogs/profile";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
      overflow: "hidden",
      cursor: "pointer",
    },
    content: {
      margin: 15,
      marginTop: 10,
      marginBottom: 10,
      "& > *": {
        overflow: "hidden",
        maxWidth: "100%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    status: {
      position: "relative",
      backgroundColor: theme.palette.status[0],
      marginTop: -22,
      top: 11,
      float: "right",
      right: 15,
      width: 22,
      height: 22,
      borderRadius: 11,
      border: `3px solid ${theme.palette.primary.main}`,
    },
  }));

  const classes = useStyles();

  const [dialogProfile, setDialogProfile] = useState(false);

  const parsePicture = () => {
    if (props.data.picture) {
      return `${process.env.REACT_APP_CDN}/pictures/profiles/${props.data.picture}`;
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
        <Picture width="100%" height={150} src={parsePicture()} />
        {props.data.online && <div className={classes.status}></div>}
        <div className={classes.content}>
          <Typography variant="body1">
            {props.data.username}, {moment().diff(props.data.birthday, "years")}
          </Typography>
          {props.data.distance && (
            <Typography variant="body2">
              {props.data.distance
                ? parseFloat(props.data.distance / 1000).toFixed(1) + " km"
                : `∞`}
            </Typography>
          )}
        </div>
      </CardActionArea>
      {dialogProfile && (
        <DialogProfile data={props.data} open={setDialogProfile} />
      )}
    </>
  );
};

export default memo(Component);
