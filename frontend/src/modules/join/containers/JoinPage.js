import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { styled } from '@mui/material/styles';
import {
    Link,
    Container,
    Typography,
    Box,
    FormControl,
    OutlinedInput,
    InputAdornment,
    Button,
    Paper,
    Alert
} from '@mui/material';

import Logo from '../../../components/Logo';
import { MotionContainer, varBounceIn } from '../../../components/animate';
import { CustomParticles } from '../components/CustomParticles';
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

export default function JoinPage() {
    const dispatch = useDispatch();

    const [code, setCode] = useState('');

    const { loading, response, error } = useSelector((state) => postCode(state));

    const handleSubmitCode = async () => {
        await dispatch(postCode({ code }));
    };

    return (
        <>
            <CustomParticles />
            <MotionContainer initial="initial" open>
                <MainContainer maxWidth="xs">
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
                                        <Alert severity="error" color="error" sx={{ mb: 2 }}>
                                            Сервер не подключен!
                                        </Alert>
                                    )}

                                    {/* Code is not valid */}
                                    {!loading && !response && (
                                        <Alert severity="error" color="error" sx={{ mb: 2 }}>
                                            Код не существует!
                                        </Alert>
                                    )}

                                    {/* Code is valid */}
                                    {response && (
                                        <Alert severity="success" color="success" sx={{ mb: 2 }}>
                                            Поздравляю, ваш код действителен!
                                        </Alert>
                                    )}

                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            value={code}
                                            onChange={(event) => {
                                                const text = event.target.value;
                                                if (text.length <= 8) setCode(text);
                                            }}
                                            sx={{
                                                fontSize: '24px',
                                                ...(code.length > 0 && {
                                                    input: {
                                                        letterSpacing: '0.25rem'
                                                    }
                                                })
                                            }}
                                            autoFocus
                                            placeholder="Введите код теста"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Button variant="contained" onClick={handleSubmitCode}>
                                                        вход
                                                    </Button>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <Typography color="secondary" textAlign="center" mt={2}>
                                        <Link
                                            href="#"
                                            onClick={() => {}}
                                            sx={{ textDecoration: 'none' }}
                                            color="primary.dark"
                                        >
                                            У вас нет кода?
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
