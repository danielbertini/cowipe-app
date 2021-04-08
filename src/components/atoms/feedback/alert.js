import React, { memo } from "react";
import { Alert } from "@material-ui/lab";

const AtomsFeedbackAlert = (props) => {
  return (
    <>
      <Alert
        action={props.action}
        closeText={props.closeText}
        color={props.color}
        icon={props.icon}
        iconMapping={props.iconMapping}
        onClose={props.onClose}
        role={props.role}
        severity={props.severity}
        variant={props.variant}
      >
        {props.children}
      </Alert>
    </>
  );
};

export default memo(AtomsFeedbackAlert);
