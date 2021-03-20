import React, { memo } from "react";
import { Skeleton } from "@material-ui/lab";

const Component = (props) => {
  return (
    <>
      <Skeleton
        variant={props.variant ? props.variant : "rect"}
        animation={props.animation && props.animation}
        width={props.width}
        height={props.height}
        style={props.style}
      />
    </>
  );
};

export default memo(Component);
