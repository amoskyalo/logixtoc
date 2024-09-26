import React from 'react';
import {
   Select,
   FormControl,
   SelectProps,
   InputLabel,
   FormHelperText,
   MenuItem,
} from '@mui/material';

const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: 250,
         overflow: 'auto',
      },
   },
};

type AdditionalProps = {
   options?: { value: string | number; label: string }[];
   children?: React.ReactNode;
   helperText?: string | boolean;
};

type PropsInterface = SelectProps & AdditionalProps;

const SelectField = (props: PropsInterface) => {
   const {
      size: inputSize,
      label,
      error,
      options = [],
      helperText,
      children,
      ...otherProps
   } = props;

   const size = inputSize ?? 'small';

   return (
      <FormControl size={size} fullWidth error={error}>
         <InputLabel>{label}</InputLabel>
         <Select fullWidth size={size} label={label} MenuProps={MenuProps} {...otherProps}>
            {options.length > 0
               ? options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                       {option.label}
                    </MenuItem>
                 ))
               : children}
         </Select>
         {helperText && <FormHelperText sx={{ ml: 0.5 }}>{helperText}</FormHelperText>}
      </FormControl>
   );
};

export default SelectField;
