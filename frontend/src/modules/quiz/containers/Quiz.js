import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { styled } from '@mui/material/styles';
import { Button, Container, Box, Pagination, Typography } from '@mui/material';

import { Header, Footer, SingleChoice, TrueFalse } from '.';

const MainBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.darker,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1)
}));

export default function Quiz() {
    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => setPage(value);

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ height: '100vh' }}>
            <Header />
            <MainBox disableGutters display="flex" flexDirection="column" flex={1}>
                <SingleChoice />
            </MainBox>
            <Footer />
        </Box>
    );
}
