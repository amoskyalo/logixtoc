import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const CheckboxInput = ({ label, ...rest }: CheckboxProps & { label: string }) => {
    return <FormControlLabel control={<Checkbox {...rest} />} label={label} />;
};

export default CheckboxInput;
