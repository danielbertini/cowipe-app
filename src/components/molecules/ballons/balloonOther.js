import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import moment from "moment";

import Typography from "../../atoms/display/typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: 10,
    display: "flex",
    justifyContent: "flex-start",
  },
  ballon: {
    minWidth: "15%",
    maxWidth: "60%",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius * 2,
    borderTopLeftRadius: 0,
    boxShadow: theme.shadows[1],
    padding: 10,
    overflow: "hidden",
  },
}));

const MoleculesBallonsBalloonOther = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const renderDate = (date) => {
    var formats = {
      sameDay: `[${t("chat.sameDay")}]`,
      nextDay: "DD/MM/YYYY",
      nextWeek: "DD/MM/YYYY",
      lastDay: `[${t("chat.lastDay")}]`,
      lastWeek: "DD/MM/YYYY",
      sameElse: "DD/MM/YYYY",
    };
    return moment().calendar(date, formats);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.ballon}>
          <Typography variant="body1">{props.data.message}</Typography>
          <div style={{ width: "100%", textAlign: "right", marginTop: 5 }}>
            <Typography variant="body2">
              {renderDate(props.data.created)} -{" "}
              {moment(props.data.created).format("hh:mm")}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MoleculesBallonsBalloonOther);
