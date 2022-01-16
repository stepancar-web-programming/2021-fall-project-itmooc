import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Box,
    Button,
    Alert,
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

import { updateInfo } from '../reducers/authReducer';
import { MotionComponent } from '../../core/animate';

export default function UserSetting({ isOpen, handleClose }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { user, loading, response } = useSelector((state) => state?.auth?.auth);

    const updateInfoSchema = yup.object().shape({
        currentPassword: yup.string().required('Необходимый'),
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
            <Formik
                initialValues={{
                    currentPassword: '',
                    password: '',
                    confirmPassword: '',
                    day: new Date(user?.birthday).getDate(),
                    month: new Date(user?.birthday).getMonth() + 1,
                    year: new Date(user?.birthday).getFullYear(),
                    gender: user?.gender
                }}
                validateOnChange={isSubmitted}
                validateOnBlur={isSubmitted}
                validationSchema={updateInfoSchema}
                onSubmit={async (values) => {
                    const { currentPassword, password, day, month, year, gender } = values;
                    const birthday = `${year}-${month}-${day}`;
                    setIsSubmitted(true);
                    await dispatch(updateInfo({ currentPassword, password, birthday, gender }));
                }}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <Dialog fullScreen={isMobile} open={isOpen} onClose={handleClose}>
                        <DialogTitle>Редактирование личной информации </DialogTitle>
                        <DialogContent>
                            <Box displa="flex" flexDirection="column">
                                <AnimatePresence>
                                    {!loading && response !== 'success' && isSubmitted && (
                                        <MotionComponent>
                                            <Alert severity="error" onClose={handleClose}>
                                                {response}
                                            </Alert>
                                        </MotionComponent>
                                    )}
                                    {!loading && response === 'success' && isSubmitted && (
                                        <MotionComponent>
                                            <Alert severity="success" onClose={handleClose}>
                                                Поздравляю, вы успешно обновили вашу информацию .
                                            </Alert>
                                        </MotionComponent>
                                    )}
                                </AnimatePresence>
                                <FormControl onSubmit={handleSubmit} fullWidth sx={{ mt: 2 }}>
                                    <TextField
                                        label="Текущий пароль"
                                        name="currentPassword"
                                        type="password"
                                        fullWidth
                                        onChange={handleChange}
                                        value={values.currentPassword}
                                        error={!!errors.currentPassword}
                                        helperText={errors.currentPassword}
                                        sx={{ mb: 2 }}
                                    />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm>
                                            <TextField
                                                label="Новый пароль"
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
                                                        {(i + 1).toString()}
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
                                                            {(currentYear - i).toString()}
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
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleSubmit}>Обновлять</Button>
                            <Button onClick={handleClose} autoFocus sx={{ color: (theme) => theme.palette.grey[600] }}>
                                Отмена
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Formik>
        </>
    );
}

UserSetting.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func
};
