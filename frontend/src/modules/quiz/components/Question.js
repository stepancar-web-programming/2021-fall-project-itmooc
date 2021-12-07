import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { MotionComponent } from '../../core/animate';

export default function Question({ question }) {
    return (
        <Box display="flex" flex={1} alignItems="center">
            <MotionComponent>
                <Typography align="center" sx={{ fontSize: '32px', flex: 1 }} color="white">
                    {question}
                </Typography>
            </MotionComponent>
        </Box>
    );
}

Question.propTypes = {
    question: PropTypes.string
};
