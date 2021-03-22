import React, { memo } from "react";
import { CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import i18n from "../../../i18n";
import Typography from "../../atoms/display/typography";

const MoleculesProductsCoin = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      padding: 10,
      overflow: "hidden",
      textAlign: "center",
    },
    selected: {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      padding: 10,
      overflow: "hidden",
      textAlign: "center",
      boxShadow: `inset 0 0 0 3px ${theme.palette.secondary.main}`,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <CardActionArea
        className={props.selected ? classes.selected : classes.root}
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        <img src={"./coin.png"} width={44} height={44} alt="coin" />
        <Typography variant="body1">
          {props.data?.description[i18n.language]}
        </Typography>
        <Typography variant="body2">
          {props.data?.currencyFormated[i18n.language]}
          {parseInt(props.data?.amount[i18n.language] / 100)}
        </Typography>
      </CardActionArea>
    </>
  );
};

export default memo(MoleculesProductsCoin);
