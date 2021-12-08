import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

export default function Question({ question }) {
    return (
        <Box display="flex" flex={1} alignItems="center">
            <Typography align="center" sx={{ fontSize: '32px', flex: 1 }} color="white">
                {question}
            </Typography>
        </Box>
    );
}

Question.propTypes = {
    question: PropTypes.string
};
