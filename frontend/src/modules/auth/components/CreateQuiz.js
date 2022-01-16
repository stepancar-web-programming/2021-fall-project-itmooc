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
        name: yup.string().required('Необходимый')
    });

    const customSpacing = isMobile ? 1 : 2;

    return (
        <>
            <Formik
                initialValues={{
                    name: ''
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
                    <Dialog open={isOpen} onClose={handleClose}>
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
                                        label="Название викторина "
                                        name="name"
                                        fullWidth
                                        onChange={handleChange}
                                        value={values.name}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        sx={{ mb: 2 }}
                                    />
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
