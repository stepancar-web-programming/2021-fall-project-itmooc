import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { motion } from 'framer-motion';

import { styled, useTheme } from '@mui/material/styles';
import {
    Link,
    Container,
    Typography,
    Box,
    FormControl,
    TextField,
    Button,
    Paper,
    Alert,
    useMediaQuery
} from '@mui/material';

import * as yup from 'yup';
import { Logo } from '../../core/components';
import { MotionContainer, varBounceIn } from '../../../components/animate';
import { CustomParticles, JoinPaper, MainContainer, ImageBox, DecoratedLink } from '../components';

export default function Login() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { loading, response, error } = { loading: false, response: false, error: false };

    const loginSchema = yup.object().shape({
        login: yup.string().required('Необходимый'),
        password: yup.string().required('Необходимый')
    });

    const customSpacing = isMobile ? 1 : 2;

    return (
        <>
            <CustomParticles />
            <MotionContainer initial="initial" open>
                <MainContainer maxWidth="sm">
                    <JoinPaper>
                        <motion.div variants={varBounceIn}>
                            <ImageBox>
                                <Logo sx={{ mr: 2 }} />
                                <Logo type="text-logo" />
                            </ImageBox>
                        </motion.div>
                        <motion.div variants={varBounceIn}>
                            <Box displa="flex" flexDirection="column">
                                {/* Server is not connected */}
                                {error && (
                                    <Alert severity="error" color="error" sx={{ mb: customSpacing }}>
                                        Сервер не подключен!
                                    </Alert>
                                )}

                                {/* Code is not valid */}
                                {!loading && !response && (
                                    <Alert severity="error" color="error" sx={{ mb: customSpacing }}>
                                        Логин или пароль неверны!
                                    </Alert>
                                )}

                                <Formik
                                    initialValues={{ login: '', password: '' }}
                                    validateOnChange={isSubmitted}
                                    validateOnBlur={isSubmitted}
                                    validationSchema={loginSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    {({ values, errors, handleChange, handleSubmit, isSubmitting, submitForm }) => (
                                        <FormControl onSubmit={handleSubmit} fullWidth>
                                            <TextField
                                                label="Логин"
                                                name="login"
                                                fullWidth
                                                onChange={handleChange}
                                                value={values.login}
                                                error={errors.login}
                                                helperText={errors.login}
                                                sx={{ mb: 2 }}
                                            />
                                            <TextField
                                                label="Пароль"
                                                name="password"
                                                fullWidth
                                                onChange={handleChange}
                                                value={values.password}
                                                error={errors.password}
                                                helperText={errors.password}
                                                sx={{ mb: isMobile ? 2 : 4 }}
                                            />
                                            <Button
                                                variant="contained"
                                                disabled={isSubmitting}
                                                type="submit"
                                                onClick={async () => {
                                                    setIsSubmitted(true);
                                                    await submitForm();
                                                }}
                                            >
                                                Войти
                                            </Button>
                                        </FormControl>
                                    )}
                                </Formik>

                                <Typography color="secondary" textAlign="center" mt={customSpacing}>
                                    <DecoratedLink href="/sign-up" color="primary.dark">
                                        Нет аккаунта? Зарегистрироваться
                                    </DecoratedLink>
                                </Typography>
                            </Box>
                        </motion.div>
                    </JoinPaper>
                </MainContainer>
            </MotionContainer>
        </>
    );
}
