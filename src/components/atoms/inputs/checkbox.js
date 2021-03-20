import React, { memo } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const Component = (props) => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checked}
            onChange={props.onChange}
            name={props.name}
            color={props.color}
          />
        }
        label={props.label}
      />
    </>
  );
};

export default memo(Component);
