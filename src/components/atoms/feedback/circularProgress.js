import React, { memo } from "react";
import { CircularProgress } from "@material-ui/core";

const Component = (props) => {
  return (
    <>
      <CircularProgress
        color={props.color}
        size={props.size}
        thickness={props.thickness}
        disableShrink={props.disableShrink}
        classes={props.classes}
        style={props.style}
        value={props.value}
        variant={props.variant}
      />
    </>
  );
};

export default memo(Component);
