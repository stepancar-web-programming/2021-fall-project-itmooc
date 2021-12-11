import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Box,
    OutlinedInput,
    InputAdornment,
    Button,
    Alert,
    Stack,
    TextField,
    useMediaQuery
} from '@mui/material';

import Logo from '../../core/components/Logo';
import { MotionComponent, varBounceIn } from '../../core/animate';
import { CustomParticles, MainContainer, ImageBox, JoinPaper, DecoratedLink } from '../components';
import { postCode, postPassword, resetState } from '../reducers/joinReducer';

export default function Join() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const { loading, response, error } = useSelector((state) => state?.auth?.join);

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

    return (
        <>
            <CustomParticles />
            <MainContainer maxWidth="sm">
                <Box>
                    <JoinPaper>
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
                                        Нет кода? Зарегистрироваться
                                    </DecoratedLink>
                                </Typography>
                            </Box>
                        </motion.div>
                    </JoinPaper>
                </Box>
            </MainContainer>
        </>
    );
}
