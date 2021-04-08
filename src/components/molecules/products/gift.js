import React, { memo } from "react";
import { CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import i18n from "../../../i18n";
import Typography from "../../atoms/display/typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 125,
    backgroundColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    padding: 10,
    overflow: "hidden",
    textAlign: "center",
  },
  disabled: {
    width: 125,
    backgroundColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    padding: 10,
    overflow: "hidden",
    textAlign: "center",
    opacity: 0.3,
  },
  selected: {
    width: 125,
    backgroundColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: 10,
    overflow: "hidden",
    textAlign: "center",
    boxShadow: `inset 0 0 0 3px ${theme.palette.secondary.main}`,
  },
}));

const MoleculesProductsCoin = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <CardActionArea
        disabled={props.data?.amount > props.balance}
        style={props.style}
        className={
          props.selected
            ? classes.selected
            : props.data?.amount > props.balance
            ? classes.disabled
            : classes.root
        }
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        <img
          src={`${process.env.REACT_APP_CDN}/ui/gifts/${props.data?._id}.png`}
          width={72}
          height={72}
          alt="gift"
        />
        <Typography variant="body1">
          {props.data?.name[i18n.language]}
        </Typography>
        <Typography variant="body2">
          {props.data?.amount}{" "}
          {props.data?.amount > 1 ? t("commons.coins") : t("commons.coin")}
        </Typography>
      </CardActionArea>
    </>
  );
};

export default memo(MoleculesProductsCoin);
