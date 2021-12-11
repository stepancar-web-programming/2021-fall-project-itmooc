import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { Header, Footer, SingleChoice, TrueFalse } from '.';

const MainBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.darker,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1)
}));

export default function Quiz() {
    const questions = [
        'С помощью какого тега в HTML создаются ссылки?',
        'Что означает HTML?',
        '</ body> Это открывающий тег или закрывающий тег?',
        'Где находится только meta тег?',
        'Выберите правильный HTML-элемент для самого большого заголовка'
    ];

    const variants = [
        ['<b>', '<a>', '<strong>', '<p>', '<i>', '<span>'],
        [
            'Hypertext Machine language.',
            'Hypertext and links markup language.',
            'Hypertext Markup Language.',
            'Hightext machine language.'
        ],
        ['Открытие', 'Закрытие'],
        ['Последняя страница', 'Домашняя страница', 'Вторая страница'],
        ['<b>', '<span>', '<h6>', '<p>', '<h1>']
    ];

    const answers = [1, 2, 0, 1, 4];

    const [page, setPage] = useState(0);
    const [pageWaiting, setPageWaiting] = useState(false);

    const setNewPage = (page) => {
        // setPageWaiting(true);
        // setTimeout(() => {
        //     setPageWaiting(false);
        //     setPage(page);
        // }, 500);
        if (page < questions.length) setPage(page);
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ height: '100vh' }}>
            <Header />
            <MainBox disableGutters display="flex" flexDirection="column" flex={1}>
                <AnimatePresence>
                    {questions.map(
                        (question, i) =>
                            i === page &&
                            !pageWaiting && (
                                <SingleChoice
                                    question={questions[page]}
                                    variants={variants[page]}
                                    answer={answers[page]}
                                    page={page}
                                    setPage={setNewPage}
                                />
                            )
                    )}
                </AnimatePresence>
            </MainBox>
            <Footer current={page} all={questions.length} setPage={setPage} />
        </Box>
    );
}
