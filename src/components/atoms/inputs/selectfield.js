import React, { memo } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";

import i18n from "../../../i18n";

const AtomsInputsSelectField = (props) => {
  const theme = useTheme();
  return (
    <>
      <FormControl variant="outlined" color="secondary" fullWidth>
        <InputLabel
          error={props.error}
          label="teste"
          shrink
          id={`input-label-${props.label}`}
        >
          {props.label}
        </InputLabel>
        <Select
          id={`select-label-${props.label}`}
          label={props.label}
          labelId={`input-label-${props.label}`}
          name={props.name}
          inputRef={props.inputRef}
          displayEmpty
          value={props.value}
          onChange={props.onChange}
          input={<OutlinedInput notched label={props.label} />}
          error={props.error}
        >
          <MenuItem value="">
            <span style={{ color: theme.palette.text.secondary }}>
              {props.placeholder}
            </span>
          </MenuItem>
          {props?.data?.map((el) => {
            if (el._id !== props.hideItem) {
              return (
                <MenuItem value={el._id} key={el._id}>
                  {el.name[i18n.language]}
                </MenuItem>
              );
            }
            return null;
          })}
        </Select>
        {props.helperText && (
          <FormHelperText style={{ color: theme.palette.error.main }}>
            {props.helperText}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default memo(AtomsInputsSelectField);
