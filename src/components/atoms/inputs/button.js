import React, { memo } from "react";
import { Button } from "@material-ui/core";

const AtomsInputsButton = (props) => {
  return (
    <>
      <Button
        size={props.size}
        variant={props.variant}
        color={props.color}
        fullWidth={props.fullWidth}
        startIcon={props.startIcon}
        disabled={props.disabled}
        component={props.component}
        to={props.to}
        onClick={props.onClick}
        style={props.style}
      >
        {props.children}
      </Button>
    </>
  );
};

export default memo(AtomsInputsButton);
