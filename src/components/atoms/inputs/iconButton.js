import React, { memo } from "react";
import { IconButton } from "@material-ui/core";

const Component = (props) => {
  return (
    <>
      <IconButton
        color={props.color}
        disabled={props.disabled}
        disableFocusRipple={props.disableFocusRipple}
        disableRipple={props.disableRipple}
        edge={props.edge}
        inputRef={props.inputRef}
        component={props.component}
        size={props.size}
        onClick={props.onClick}
        style={props.style ? props.style : { height: 44, width: 44 }}
      >
        {props.children}
      </IconButton>
    </>
  );
};

export default memo(Component);
