import React, { memo } from "react";
import { Snackbar } from "@material-ui/core";

const Component = (props) => {
  return (
    <>
      <Snackbar
        anchorOrigin={props.anchorOrigin}
        open={props.open}
        onClose={props.onClose}
        autoHideDuration={
          props.autoHideDuration ? props.autoHideDuration : 3000
        }
        message={props.message}
      />
    </>
  );
};

export default memo(Component);
