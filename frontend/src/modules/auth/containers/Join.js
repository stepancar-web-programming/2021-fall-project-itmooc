import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { MotionContainer, varBounceIn } from '../../../components/animate';
import { CustomParticles, MainContainer, ImageBox, JoinPaper, DecoratedLink } from '../components';
import { postCode, resetState } from '../reducers/joinReducer';
import MotionComponent from '../../../components/animate/MotionComponent';

export default function Join() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [code, setCode] = useState('');

    const { loading, response, error } = useSelector((state) => state?.auth?.join);

    const handleType = (event) => {
        const text = event.target.value;
        if (text.length <= 8) setCode(text);
    };

    const handleSubmitCode = async () => {
        if (response) {
            dispatch(resetState());
            setTimeout(() => dispatch(postCode({ code })), 650);
        } else await dispatch(postCode({ code }));
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

    return (
        <>
            <CustomParticles />
            <MotionContainer initial="initial" open>
                <MainContainer maxWidth="sm">
                    <Box>
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
                                        {!loading && error && response && (
                                            <MotionComponent>
                                                <Alert severity="error" onClose={() => dispatch(resetState())}>
                                                    {response}
                                                </Alert>
                                            </MotionComponent>
                                        )}
                                        {!loading && !error && response && (
                                            <MotionComponent>
                                                <Alert severity="success" onClose={() => dispatch(resetState())}>
                                                    Поздравляю, ваш код действителен!
                                                </Alert>
                                            </MotionComponent>
                                        )}
                                    </AnimatePresence>

                                    {isMobile ? (
                                        <Stack mt={2}>
                                            <TextField
                                                value={code}
                                                fullWidth
                                                onChange={handleType}
                                                sx={{ ...inputCss, mb: 2 }}
                                                autoFocus
                                                placeholder="Введите код теста"
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={handleSubmitCode}
                                                disabled={code.length < 8}
                                            >
                                                присоединиться
                                            </Button>
                                        </Stack>
                                    ) : (
                                        <OutlinedInput
                                            value={code}
                                            fullWidth
                                            onChange={handleType}
                                            sx={{ ...inputCss, mt: 2 }}
                                            autoFocus
                                            placeholder="Введите код теста"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleSubmitCode}
                                                        disabled={code.length < 8}
                                                    >
                                                        присоединиться
                                                    </Button>
                                                </InputAdornment>
                                            }
                                        />
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
            </MotionContainer>
        </>
    );
}
