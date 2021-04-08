import React, { memo } from "react";
import { LinearProgress } from "@material-ui/core";

const AtomsFeedbackLinearProgress = (props) => {
  return (
    <>
      <LinearProgress
        color={props.color}
        value={props.value}
        valueBuffer={props.valueBuffer}
        variant={props.variant}
      />
    </>
  );
};

export default memo(AtomsFeedbackLinearProgress);
