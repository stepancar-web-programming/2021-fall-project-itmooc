import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography, Container, Grid, Box, Button } from '@mui/material';

import Join from './Join';
import QuizBlock from '../components/QuizBlock';
import UpdateInfo from './UpdateInfo';

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading: loadingJoin,
        response: responseJoin,
        error: errorJoin
    } = useSelector((state) => state?.home?.join);

    const { user, error: errorUser } = useSelector((state) => state?.auth?.auth);

    useEffect(() => {
        document.body.style.background = '#f9f9f9';
        // if (!loadingJoin && !errorJoin && responseJoin && !responseJoin?.passwordRequired) navigate('/quiz');
        // else if (errorUser) navigate('/sign-in');
        // else if (!user) dispatch(me({}));
    });

    return (
        <Container maxWidth="lg">
            <Grid container>
                <Grid item xs={8}>
                    <Join />
                </Grid>
                <Grid item xs={4}>
                    <UpdateInfo />
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between" m={2}>
                <Typography variant="h4" component="p">
                    Моя викторина
                </Typography>
                <Button>Узнать больше</Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between" m={2}>
                <Typography variant="h4" component="p">
                    Русский
                </Typography>
                <Button>Узнать больше</Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between" m={2}>
                <Typography variant="h4" component="p">
                    Математика
                </Typography>
                <Button>Узнать больше</Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuizBlock
                        name="Demo1"
                        questionNumber={5}
                        chips={['русский язык', 'математика', 'иностранные языки', 'физика']}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
