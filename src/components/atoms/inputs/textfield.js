import React, { memo } from "react";
import { TextField } from "@material-ui/core";

const AtomsInputsTextField = (props) => {
  return (
    <>
      <TextField
        id={props.id}
        error={props.error}
        helperText={props.helperText}
        label={props.label}
        placeholder={props.placeholder}
        type={props.type}
        multiline={props.multiline}
        color={props.color}
        variant={props.variant}
        name={props.name}
        ref={props.ref}
        inputRef={props.inputRef}
        onKeyPress={props.onKeyPress}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        value={props.value}
        style={props.style}
        rowsMax={props.rowsMax}
        rows={props.rows}
        onChange={props.onChange}
        InputLabelProps={{ shrink: props.shrink }}
        fullWidth={props.fullWidth}
      />
    </>
  );
};

export default memo(AtomsInputsTextField);
