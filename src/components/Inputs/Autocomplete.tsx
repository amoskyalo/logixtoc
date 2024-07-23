import React from 'react';
import { Autocomplete, AutocompleteProps } from '@mui/material';
import TextFieldInput from './TextFieldInput';

type AdditionalProps = {
   label?: string;
   error?: boolean;
   helperText?: string;
};

type PropsInterface = AdditionalProps &
   Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'renderInput'>;

const AutoCompleteField = (props: PropsInterface) => {
   const { label, error, helperText, ...otherProps } = props;

   return (
      <Autocomplete
         {...otherProps}
         fullWidth
         size="small"
         renderInput={(params) => (
            <TextFieldInput label={label} error={error} helperText={helperText} {...params} />
         )}
      />
   );
};

export default AutoCompleteField;
