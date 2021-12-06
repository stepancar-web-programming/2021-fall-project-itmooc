import React, { useState } from 'react';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import * as yup from 'yup';

import {
    Typography,
    Box,
    Button,
    FormControl,
    TextField,
    Grid,
    Alert,
    MenuItem,
    RadioGroup,
    Radio,
    FormControlLabel,
    useMediaQuery
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import Logo from '../../core/components/Logo';
import { MotionContainer, varBounceIn } from '../../../components/animate';
import { CustomParticles, ImageBox, JoinPaper, MainContainer, DecoratedLink } from '../components';
import {useDispatch} from "react-redux";

export default function LoginContainer() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { loading, response, error } = { loading: false, response: false, error: false };

    const signUpSchema = yup.object().shape({
        login: yup
            .string()
            .required('Необходимый')
            .min(8, 'Длина логина должна быть не менее 8')
            .max(20, 'Длина логина не должна превышать 20')
            .matches(/^[a-zA-Z0-9._]+$/, 'Логин содержит только символы a-z, A-Z, 0-9 и тире (_) или точку (.)')
            .matches(/^(?![_.])[a-zA-Z0-9._]*$/, 'Логин не может начинаться с тире (_) или точки (.)')
            .matches(/^[a-zA-Z0-9._]*(?<![_.])$/, 'Логин не может заканчиваться тире или точкой')
            .matches(/^(?!.*[_.]{2}).*$/, 'нет __ или _. или ._ или .. внутри логина'),
        password: yup
            .string()
            .required('Необходимый')
            .min(8, 'Длина пароля должна быть не менее 8')
            .max(20, 'Длина пароля не должна превышать 20'),
        confirmPassword: yup
            .string()
            .required('Пароль подтверждения должен совпадать')
            .oneOf([yup.ref('password')], 'Пароль подтверждения должен совпадать')
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
                                {error && (
                                    <Alert severity="error" color="error" sx={{ mb: 2 }}>
                                        Сервер не подключен!
                                    </Alert>
                                )}

                                {!loading && !response && (
                                    <Alert severity="error" color="error" sx={{ mb: 2 }}>
                                        Логин или пароль неверны!
                                    </Alert>
                                )}

                                <Formik
                                    initialValues={{
                                        firstName: '',
                                        lastName: '',
                                        login: '',
                                        password: '',
                                        confirmPassword: '',
                                        day: new Date().getDate(),
                                        month: new Date().getMonth() + 1,
                                        year: new Date().getFullYear(),
                                        gender: 'female'
                                    }}
                                    validateOnChange={isSubmitted}
                                    validateOnBlur={isSubmitted}
                                    validationSchema={signUpSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        alert(values);
                                        console.log(values);
                                        setSubmitting(false);
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
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm>
                                                    <TextField
                                                        label="Пароль"
                                                        name="password"
                                                        type="password"
                                                        fullWidth
                                                        onChange={handleChange}
                                                        value={values.password}
                                                        error={!!errors.password}
                                                        helperText={errors.password}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm>
                                                    <TextField
                                                        label="Подтверждение пароля"
                                                        name="confirmPassword"
                                                        type="password"
                                                        fullWidth
                                                        onChange={handleChange}
                                                        value={values.confirmPassword}
                                                        error={!!errors.confirmPassword}
                                                        helperText={errors.confirmPassword}
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography variant="caption1" mb={2}>
                                                День рождения
                                            </Typography>
                                            <Grid container spacing={1} mb={2}>
                                                <Grid item xs>
                                                    <TextField
                                                        label="День"
                                                        name="day"
                                                        select
                                                        fullWidth
                                                        value={values.day}
                                                    >
                                                        {[...Array(31)].map((_, i) => (
                                                            <MenuItem value={i + 1} key={i}>
                                                                {i + 1}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        label="Месяц"
                                                        name="month"
                                                        select
                                                        fullWidth
                                                        value={values.month}
                                                    >
                                                        <MenuItem value={1}>Январь</MenuItem>
                                                        <MenuItem value={2}>Февраль</MenuItem>
                                                        <MenuItem value={3}>Март</MenuItem>
                                                        <MenuItem value={4}>Апрель</MenuItem>
                                                        <MenuItem value={5}>Май </MenuItem>
                                                        <MenuItem value={6}>Июнь</MenuItem>
                                                        <MenuItem value={7}>Июль</MenuItem>
                                                        <MenuItem value={8}>Август</MenuItem>
                                                        <MenuItem value={9}>Сентябрь</MenuItem>
                                                        <MenuItem value={10}>Октябрь</MenuItem>
                                                        <MenuItem value={11}>Ноябрь</MenuItem>
                                                        <MenuItem value={12}>Декабрь</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        label="Год"
                                                        name="year"
                                                        select
                                                        fullWidth
                                                        value={values.year}
                                                    >
                                                        {((currentYear = new Date().getFullYear()) =>
                                                            [...Array(currentYear - 1900 + 1)].map((_, i) => (
                                                                <MenuItem value={currentYear - i} key={i}>
                                                                    {currentYear - i}
                                                                </MenuItem>
                                                            )))()}
                                                    </TextField>
                                                </Grid>
                                            </Grid>
                                            <Typography variant="caption1">Пол</Typography>
                                            <RadioGroup name="gender" value={values.gender} onChange={handleChange}>
                                                <Grid container spacing={customSpacing} mb={customSpacing}>
                                                    <Grid item xs={12} sm>
                                                        <FormControlLabel
                                                            label="Женщина"
                                                            value="female"
                                                            control={<Radio />}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm>
                                                        <FormControlLabel
                                                            label="Мужчина"
                                                            value="male"
                                                            control={<Radio />}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm>
                                                        <FormControlLabel
                                                            label="Другое"
                                                            value="other"
                                                            control={<Radio />}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </RadioGroup>
                                            <Button
                                                variant="contained"
                                                disabled={isSubmitting}
                                                type="submit"
                                                onClick={async () => {
                                                    setIsSubmitted(true);
                                                    await submitForm();
                                                }}
                                            >
                                                Регистрация
                                            </Button>
                                        </FormControl>
                                    )}
                                </Formik>
                                <Typography color="secondary" textAlign="center" mt={customSpacing}>
                                    <DecoratedLink href="/login" color="primary.dark">
                                        Уже есть аккаунт? Войти в систему
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
