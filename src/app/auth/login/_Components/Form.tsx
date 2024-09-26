'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { TextFieldInput } from '@/components/Inputs';
import { SubmitButton } from '@/components/Buttons';
import { Box, Checkbox, FormControlLabel, InputAdornment, Typography } from '@mui/material';
import { UserLogins, useUserLogin } from '@/api';
import { toast } from 'react-toastify';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const sx = {
   '& .MuiInputBase-input:focus': {
      boxShadow: 'none',
   },
   '.MuiFormHelperText-root': {
      marginLeft: 0.5,
   },

   '& .MuiInputLabel-root': {
      color: '#10333f',
      '&.Mui-error': {
         color: '#d32f2f',
      },
   },
   '& .MuiInputBase-root': {
      color: '#10333f',
      '& .MuiOutlinedInput-notchedOutline': {
         borderColor: '#10333f',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
         borderColor: '#10333f',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
         borderColor: '#10333f',
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
         borderColor: '#d32f2f',
      },
      '&.Mui-error': {
         color: '#d32f2f',
      },
   },
};

const LoginForm = () => {
   const { mutate } = useUserLogin();
   const [loading, setLoading] = useState<boolean>(false);
   const [type, setType] = useState('password');

   const validationSchema = () => {
      return Yup.object().shape({
         password: Yup.string().required('Password field is required'),
         phoneNumber: Yup.string().required('Phoner number / email is required'),
      });
   };

   const handleLogin = (logins: UserLogins) => {
      setLoading(true);
      mutate(logins, {
         onSuccess: (data) => {
            if (data.UserToken) {
               const user = JSON.stringify(data);
               localStorage.setItem('user', user);
               toast.success(data.Message);
               window.location.replace('/dashboard');
            } else {
               toast.error(data.Message);
            }

            setLoading(false);
         },
      });
   };

   const handleChangeType = () => {
      type === 'password' ? setType('text') : setType('password');
   };

   return (
      <Box sx={{ width: '100%' }}>
         <Formik
            initialValues={{
               password: '',
               phoneNumber: '',
            }}
            onSubmit={handleLogin}
            validationSchema={validationSchema()}
            validateOnBlur={false}
         >
            {({ touched, errors, getFieldProps }) => {
               function getProps(field: string) {
                  const key = field as keyof UserLogins;
                  const error = Boolean(touched[key] && errors[key]);
                  const helperText = touched[key] && errors[key];

                  return { error, helperText, ...getFieldProps(field) };
               }

               return (
                  <Form>
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           rowGap: 3,
                        }}
                     >
                        <TextFieldInput
                           label="Email / Phone Number"
                           {...getProps('phoneNumber')}
                           sx={sx}
                        />

                        <TextFieldInput
                           sx={sx}
                           label="Password"
                           type={type}
                           {...getProps('password')}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment onClick={handleChangeType} position="end">
                                    {type === 'password' ? (
                                       <RemoveRedEyeIcon />
                                    ) : (
                                       <VisibilityOffIcon />
                                    )}
                                 </InputAdornment>
                              ),
                           }}
                        />
                        <FormControlLabel
                           control={
                              <Checkbox
                                 defaultChecked
                                 sx={{
                                    color: '#10333f',
                                    '&.Mui-checked': {
                                       color: '#10333f',
                                    },
                                 }}
                              />
                           }
                           label="Remember me"
                           sx={{
                              color: '#10333f',
                           }}
                        />
                        <SubmitButton text="Login" loading={loading} isLogin />
                        <Typography textAlign={'center'} color="#10333f" variant="body1">
                           Forgot password?
                        </Typography>
                     </Box>
                  </Form>
               );
            }}
         </Formik>
      </Box>
   );
};

export default LoginForm;
