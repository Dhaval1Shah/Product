import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AuthApi from '../../../Services/Authapi';
import swal from 'sweetalert';
import ls from "local-storage";
import Grid from '@material-ui/core/Grid';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});

const LoginForm = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let checkLogin = await AuthApi.login(values);
            if (checkLogin && checkLogin !== false) {
                ls.set("authToken", checkLogin.access_token);
                props.setAutUser({ authUser: checkLogin.data, authToken: checkLogin.access_token })
            } else {
                swal({
                    title: "OOPS!",
                    text: "Invalid Credentials",
                    icon: "error",
                });
            }
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            variant="outlined"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" fullWidth type="submit"> Login </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
export default LoginForm;