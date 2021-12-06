import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';

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
import MotionComponent from '../../../components/animate/MotionComponent';
import { resetState } from '../reducers/joinReducer';

export default function Login() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { loading, user, error } = useSelector((state) => state?.auth?.auth);

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
                                <AnimatePresence>
                                    {!loading && error && user && (
                                        <MotionComponent>
                                            <Alert severity="error" onClose={() => dispatch(resetState())}>
                                                {user}
                                            </Alert>
                                        </MotionComponent>
                                    )}
                                    {!loading && !error && user && (
                                        <MotionComponent>
                                            <Alert severity="success" onClose={() => dispatch(resetState())}>
                                                Поздравляю, ваш код действителен!
                                            </Alert>
                                        </MotionComponent>
                                    )}
                                </AnimatePresence>
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
                                                error={!!errors.login}
                                                helperText={errors.login}
                                                sx={{ mb: 2 }}
                                            />
                                            <TextField
                                                label="Пароль"
                                                name="password"
                                                fullWidth
                                                onChange={handleChange}
                                                value={values.password}
                                                error={!!errors.password}
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
