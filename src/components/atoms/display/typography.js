import React, { memo } from "react";
import { Typography } from "@material-ui/core";

const AtomsDisplayTypography = (props) => {
  return (
    <>
      <Typography
        variant={props.variant}
        align={props.align}
        component={props.component}
        display={props.display}
        gutterBottom={props.gutterBottom}
        style={props.style}
        noWrap={props.noWrap}
      >
        {props.children}
      </Typography>
    </>
  );
};

export default memo(AtomsDisplayTypography);
