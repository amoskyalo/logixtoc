'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { TextFieldInput } from '@/components/Inputs';
import { SubmitButton } from '@/components/Buttons';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { UserLogins, useUserLogin } from '@/api';
import { toast } from 'react-toastify';

const LoginForm = () => {
   const { mutate } = useUserLogin();
   const [loading, setLoading] = useState<boolean>(false);

   const validationSchema = () => {
      return Yup.object().shape({
         password: Yup.string().required('Password field cannot be empty'),
         phoneNumber: Yup.string().required('Phoner number / email cannot be empty'),
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

   return (
      <Box sx={{ width: '100%' }}>
         <Formik
            initialValues={{
               password: '',
               phoneNumber: '',
            }}
            onSubmit={handleLogin}
            validationSchema={validationSchema()}
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
                        <TextFieldInput label="Email / Phone Number" {...getProps('phoneNumber')} />
                        <TextFieldInput label="Password" {...getProps('password')} />
                        <FormControlLabel
                           control={<Checkbox defaultChecked />}
                           label="Remember me"
                        />
                        <SubmitButton text="Login" loading={loading} />
                        <Typography textAlign={'center'} color="primary" variant="body1">
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
