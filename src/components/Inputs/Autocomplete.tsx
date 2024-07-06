import React from "react";
import { Autocomplete, AutocompleteProps } from "@mui/material";
import TextFieldInput from "./TextFieldInput";

type AdditionalProps = {
  label?: string;
  error?: boolean;
  helperText?: string;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
type PropsInterface = AdditionalProps & AutocompleteProps;

const AutoCompleteField = (props: PropsInterface) => {
  const { label, error, helperText, ...otherProps } = props;

  return (
    <Autocomplete
      fullWidth
      size="small"
      renderInput={(params) => (
        <TextFieldInput
          label={label}
          error={error}
          helperText={helperText}
          {...params}
        />
      )}
      {...otherProps}
    />
  );
};

export default AutoCompleteField;
