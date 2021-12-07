import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';

import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

import { MotionContainer, varBounceIn } from '../modules/core/animate';
import Page from '../modules/core/components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
}));

export default function Page404() {
    return (
        <RootStyle title="404 Страница Не Найдена - ITMOOC">
            <Container>
                <MotionContainer initial="initial" open>
                    <Box maxWidth="sm" margin="auto" textAlign="center">
                        <motion.div variants={varBounceIn}>
                            <Typography variant="h3" paragraph>
                                Извините, страница не найдена!
                            </Typography>
                        </motion.div>
                        <Typography sx={{ color: 'text.secondary' }}>
                            К сожалению, нам не удалось найти нужную страницу. Возможно, вы ошиблись при вводе
                            URL-адреса? Обязательно проверьте правописание.
                        </Typography>

                        <motion.div variants={varBounceIn}>
                            <Box
                                component="img"
                                src="/static/illustrations/404.png"
                                sx={{ mx: 'auto', my: { xs: 5, sm: 10 } }}
                            />
                        </motion.div>

                        <Button to="/" size="large" variant="contained" component={RouterLink}>
                            Вернуться
                        </Button>
                    </Box>
                </MotionContainer>
            </Container>
        </RootStyle>
    );
}
