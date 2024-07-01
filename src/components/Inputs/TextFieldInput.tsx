import React from "react";
import { TextFieldProps, TextField, FormControl } from "@mui/material";

const TextFieldInput = (props: TextFieldProps) => {
  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        size="small"
        InputLabelProps={{ size: "small" }}
        sx={{
          "& .MuiInputBase-input:focus": {
            boxShadow: "none",
          },
          ".MuiInputLabel-root": {
            top: 1,
          },
          ".MuiFormHelperText-root": {
            marginLeft: 0.5,
          },
        }}
        inputProps={{
          style: {
            height: "28px",
          },
        }}
        {...props}
      />
    </FormControl>
  );
};

export default TextFieldInput;
