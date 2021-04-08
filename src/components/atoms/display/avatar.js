import React, { memo } from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) =>
      props.backgroundColor
        ? props.backgroundColor
        : theme.palette.secondary.main,
    boxShadow: theme.shadows[3],
  },
}));

const AtomsDisplayAvatar = (props) => {
  const classes = useStyles(props);
  return (
    <>
      <Avatar
        alt={props.alt}
        component={props.component}
        imgProps={props.imgProps}
        sizes={props.sizes}
        src={props.src}
        srcSet={props.srcSet}
        variant={props.variant}
        className={classes.root}
        style={props.style}
        onClick={props.onClick}
      >
        {props.children}
      </Avatar>
    </>
  );
};

export default memo(AtomsDisplayAvatar);
