import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { Paper, Chip, Typography, Container } from '@mui/material';

export const QuizPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
        margin: theme.spacing(1)
    },
    boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)'
}));

export default function QuizBlock({ name, questionNumber, chips }) {
    const colors = {
        'русский язык': 'primary',
        математика: 'secondary',
        'иностранные языки': 'info',
        физика: 'warning',
        химия: 'error',
        биология: 'primary',
        география: 'secondary',
        литература: 'info',
        история: 'warning',
        обществознание: 'success',
        информатика: 'error'
    };
    return (
        <QuizPaper>
            <Typography variant="h6" component="p">
                {name}
            </Typography>
            <Typography variant="p">{questionNumber}</Typography>
            <br />
            <Container disableGutters sx={{ textAlign: 'center' }}>
                {chips.map((chip, i) => (
                    <Chip key={i} label={chip} clickable sx={{ mr: 1, mt: 1 }} color={colors[chip]} size="small" />
                ))}
            </Container>
        </QuizPaper>
    );
}

QuizBlock.propTypes = {
    name: PropTypes.string,
    questionNumber: PropTypes.number,
    chips: PropTypes.array
};
