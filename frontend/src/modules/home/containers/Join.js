import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Box,
    Container,
    OutlinedInput,
    InputAdornment,
    Button,
    Alert,
    Stack,
    TextField,
    useMediaQuery,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';

import Logo from '../../core/components/Logo';
import { postCode, postPassword, resetState } from '../reducers/joinReducer';
import { signUp } from '../../auth/reducers/authReducer';

import { MotionComponent, varBounceIn } from '../../core/animate';
import { ImageBox, CustomPaper, DecoratedLink } from '../../auth/components';

export default function Join() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [dialog, setDialog] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const user = 'ac';

    const signUpSchema = yup.object().shape({
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

    const { loading, response, error } = useSelector((state) => state?.home?.join);

    const handleTypeCode = (event) => {
        const text = event.target.value;
        const regex = new RegExp(/^\d{0,8}$/);
        if (regex.test(text)) setCode(text);
    };

    const handleSubmitCode = async () => {
        if (response) {
            dispatch(resetState());
            setTimeout(() => dispatch(postCode({ code })), 650);
        } else await dispatch(postCode({ code }));
    };

    const handleSubmitPassword = async () => {
        if (response) {
            dispatch(resetState());
            setTimeout(() => dispatch(postPassword({ code, password })), 650);
        } else await dispatch(postPassword({ code, password }));
    };

    const handleClose = () => setDialog(false);

    const handleOpen = () => setDialog(true);

    const inputCss = {
        fontSize: '16px',
        ...(code.length > 0 && {
            input: {
                letterSpacing: '0.25rem'
            }
        })
    };

    const customSpacing = isMobile ? 1 : 2;

    if (!loading && !error && response && !response?.passwordRequired) navigate('/quiz');

    useEffect(() => {});

    return (
        <>
            <Dialog fullScreen={isMobile} open={dialog} onClose={handleClose}>
                <DialogTitle>Редактирование личной информации </DialogTitle>
                <DialogContent>
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
                                        Поздравляю, вы успешно зарегистрировались.
                                    </Alert>
                                </MotionComponent>
                            )}
                        </AnimatePresence>
                        <Formik
                            initialValues={{
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
                            onSubmit={async (values) => {
                                const { password, day, month, year, gender } = values;
                                const birthday = `${year}-${month}-${day}`;
                                if (user || response) {
                                    dispatch(resetState());
                                    setTimeout(() => dispatch(signUp({ password, birthday, gender })), 650);
                                } else await dispatch(signUp({ password, birthday, gender }));
                            }}
                        >
                            {({ values, errors, handleChange, handleSubmit, isSubmitting, submitForm }) => (
                                <FormControl onSubmit={handleSubmit} fullWidth sx={{ mt: 2 }}>
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
                                                onChange={handleChange}
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
                                                onChange={handleChange}
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
                                                onChange={handleChange}
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
                                        <Grid container spacing={customSpacing}>
                                            <Grid item xs={12} sm>
                                                <FormControlLabel label="Женщина" value="female" control={<Radio />} />
                                            </Grid>
                                            <Grid item xs={12} sm>
                                                <FormControlLabel label="Мужчина" value="male" control={<Radio />} />
                                            </Grid>
                                            <Grid item xs={12} sm>
                                                <FormControlLabel label="Другое" value="other" control={<Radio />} />
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>
                                </FormControl>
                            )}
                        </Formik>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Обновлять
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container>
                <Grid item xs={8}>
                    <CustomPaper>
                        <motion.div animate={varBounceIn.animate}>
                            <ImageBox>
                                <Logo sx={{ mr: 2 }} />
                                <Logo type="text-logo" />
                            </ImageBox>
                        </motion.div>
                        <motion.div animate={varBounceIn.animate}>
                            <Box displa="flex" flexDirection="column">
                                <AnimatePresence>
                                    {!loading && error && response && !response?.passwordRequired && (
                                        <MotionComponent>
                                            <Alert severity="error" onClose={() => dispatch(resetState())}>
                                                {response}
                                            </Alert>
                                        </MotionComponent>
                                    )}
                                    {!loading && error && response?.passwordRequired && (
                                        <MotionComponent>
                                            <Alert severity="error" onClose={() => dispatch(resetState())}>
                                                {response.error}
                                            </Alert>
                                        </MotionComponent>
                                    )}
                                    {!loading && !error && response?.passwordRequired && (
                                        <MotionComponent>
                                            <Alert severity="warning" onClose={() => dispatch(resetState())}>
                                                Эта викторина требует пароля
                                            </Alert>
                                        </MotionComponent>
                                    )}
                                </AnimatePresence>
                                {isMobile || (!loading && !error && response?.passwordRequired) ? (
                                    <Stack mt={2}>
                                        <TextField
                                            value={code}
                                            onChange={handleTypeCode}
                                            label="Код"
                                            fullWidth
                                            sx={{ ...inputCss, mb: 2 }}
                                            autoFocus
                                            placeholder="Введите код теста"
                                            disabled={!loading && !error && response?.passwordRequired}
                                        />
                                        <AnimatePresence>
                                            {!loading && !error && response?.passwordRequired && (
                                                <TextField
                                                    value={password}
                                                    onChange={(event) => setPassword(event.target.value)}
                                                    label="Пароль"
                                                    name="password"
                                                    type="password"
                                                    fullWidth
                                                    sx={{ mb: customSpacing * 2 }}
                                                />
                                            )}
                                        </AnimatePresence>
                                        <Button
                                            variant="contained"
                                            onClick={
                                                response?.passwordRequired ? handleSubmitPassword : handleSubmitCode
                                            }
                                            disabled={code.length < 8 || loading}
                                        >
                                            присоединиться
                                        </Button>
                                    </Stack>
                                ) : (
                                    <>
                                        <OutlinedInput
                                            value={code}
                                            onChange={handleTypeCode}
                                            fullWidth
                                            sx={{ ...inputCss, mt: 2 }}
                                            disabled={!loading && !error && response}
                                            autoFocus
                                            placeholder="Введите код теста"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleSubmitCode}
                                                        disabled={
                                                            code.length < 8 ||
                                                            loading ||
                                                            (!loading && !error && response)
                                                        }
                                                    >
                                                        присоединиться
                                                    </Button>
                                                </InputAdornment>
                                            }
                                        />
                                    </>
                                )}
                                <Typography color="secondary" textAlign="center" mt={customSpacing}>
                                    <DecoratedLink href="/sign-up" color="primary.dark">
                                        Нет кода? Создать викторину
                                    </DecoratedLink>
                                </Typography>
                            </Box>
                        </motion.div>
                    </CustomPaper>
                </Grid>
                <Grid item xs={4}>
                    <CustomPaper sx={{ textAlign: 'center', height: '248px' }}>
                        <Container
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}
                        >
                            <Typography variant="h5" component="p" mb={2}>
                                Vo Minh Thien Long
                            </Typography>
                            <motion.div animate={varBounceIn.animate}>
                                <Button variant="contained" sx={{ mb: 2 }}>
                                    Создать викторину
                                </Button>
                            </motion.div>
                            <motion.div animate={varBounceIn.animate}>
                                <Button variant="outlined" onClick={handleOpen}>
                                    Настройки
                                </Button>
                            </motion.div>
                        </Container>
                    </CustomPaper>
                </Grid>
            </Grid>
        </>
    );
}
