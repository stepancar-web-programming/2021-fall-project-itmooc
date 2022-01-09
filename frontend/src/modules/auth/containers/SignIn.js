import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import * as yup from 'yup';

import { useTheme } from '@mui/material/styles';
import { Typography, Box, FormControl, TextField, Button, Alert, useMediaQuery } from '@mui/material';

import { Logo } from '../../core/components';
import { MotionContainer, MotionComponent, varBounceIn } from '../../core/animate';
import { CustomParticles, CustomPaper, MainContainer, ImageBox, DecoratedLink } from '../components';
import { signIn, resetState } from '../reducers/authReducer';

export default function SignIn() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { loading, user, response, error } = useSelector((state) => state?.auth?.auth);

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
                    <CustomPaper>
                        <motion.div variants={varBounceIn}>
                            <ImageBox>
                                <Logo sx={{ mr: 2 }} />
                                <Logo type="text-logo" />
                            </ImageBox>
                        </motion.div>
                        <motion.div variants={varBounceIn}>
                            <Box displa="flex" flexDirection="column">
                                <AnimatePresence>
                                    {!loading && error && response && (
                                        <MotionComponent>
                                            <Alert severity="error" onClose={() => dispatch(resetState())}>
                                                {response}
                                            </Alert>
                                        </MotionComponent>
                                    )}
                                    {!loading && !error && user && (
                                        <MotionComponent>
                                            <Alert severity="success" onClose={() => dispatch(resetState())}>
                                                Поздравляем, вы успешно вошли в систему.
                                            </Alert>
                                        </MotionComponent>
                                    )}
                                </AnimatePresence>
                                <Formik
                                    initialValues={{ login: '', password: '' }}
                                    validateOnChange={isSubmitted}
                                    validateOnBlur={isSubmitted}
                                    validationSchema={loginSchema}
                                    onSubmit={async (values) => {
                                        const { login, password } = values;
                                        if (user || response) {
                                            dispatch(resetState());
                                            setTimeout(() => dispatch(signIn({ login, password })), 650);
                                        } else await dispatch(signIn({ login, password }));
                                    }}
                                >
                                    {({ values, errors, handleChange, handleSubmit, submitForm, isSubmitting }) => (
                                        <FormControl onSubmit={handleSubmit} fullWidth sx={{ mt: 2 }}>
                                            <TextField
                                                label="Логин"
                                                name="login"
                                                fullWidth
                                                onChange={handleChange}
                                                value={values.login}
                                                error={!!errors.login}
                                                helperText={errors.login}
                                                sx={{ mb: 2 }}
                                            />
                                            <TextField
                                                label="Пароль"
                                                name="password"
                                                type="password"
                                                fullWidth
                                                onChange={handleChange}
                                                value={values.password}
                                                error={!!errors.password}
                                                helperText={errors.password}
                                                sx={{ mb: isMobile ? 2 : 4 }}
                                            />
                                            <Button
                                                variant="contained"
                                                disabled={loading || isSubmitting}
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
                    </CustomPaper>
                </MainContainer>
            </MotionContainer>
        </>
    );
}
