import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { styled, useTheme } from '@mui/material/styles';
import {
    Link,
    Container,
    Typography,
    Box,
    OutlinedInput,
    InputAdornment,
    Button,
    Paper,
    Alert,
    Stack,
    TextField,
    useMediaQuery
} from '@mui/material';

import Logo from '../../core/components/Logo';
import { MotionContainer, varBounceIn } from '../../../components/animate';
import { CustomParticles } from '../components';
import { postCode } from '../reducers/joinReducer';

const MainContainer = styled(Container)(() => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
}));

const JoinPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    margin: theme.spacing(2, 0)
}));

const ImageBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4)
}));

export default function Join() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [code, setCode] = useState('');

    const { loading, response, error } = useSelector((state) => state?.join?.join);

    const handleType = (event) => {
        const text = event.target.value;
        if (text.length <= 8) setCode(text);
    };

    const handleSubmitCode = async () => {
        await dispatch(postCode({ code }));
    };

    const inputCss = {
        fontSize: '16px',
        ...(code.length > 0 && {
            input: {
                letterSpacing: '0.25rem'
            }
        })
    };

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
                                    {/* Server is not connected */}
                                    {error && (
                                        <Alert severity="error" color="error">
                                            Сервер не подключен!
                                        </Alert>
                                    )}

                                    {/* Code is not valid */}
                                    {!loading && !response && (
                                        <Alert severity="error" color="error">
                                            Код не существует!
                                        </Alert>
                                    )}

                                    {/* Code is valid */}
                                    {response && (
                                        <Alert severity="success" color="success">
                                            Поздравляю, ваш код действителен!
                                        </Alert>
                                    )}
                                    {isMobile ? (
                                        <Stack mt={1}>
                                            <TextField
                                                value={code}
                                                fullWidth
                                                onChange={handleType}
                                                sx={{ ...inputCss, mb: 2 }}
                                                autoFocus
                                                placeholder="Введите код теста"
                                            />
                                            <Button variant="contained">присоединиться</Button>
                                        </Stack>
                                    ) : (
                                        <OutlinedInput
                                            value={code}
                                            fullWidth
                                            onChange={handleType}
                                            sx={{ ...inputCss, mt: 1 }}
                                            autoFocus
                                            placeholder="Введите код теста"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Button variant="contained" onClick={handleSubmitCode}>
                                                        присоединиться
                                                    </Button>
                                                </InputAdornment>
                                            }
                                        />
                                    )}
                                    <Typography color="secondary" textAlign="center" mt={2}>
                                        <Link
                                            href="/sign-up"
                                            sx={{
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    fontWeight: 600
                                                }
                                            }}
                                            color="primary.dark"
                                        >
                                            Нет кода? Зарегистрироваться
                                        </Link>
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
