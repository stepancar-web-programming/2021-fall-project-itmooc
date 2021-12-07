import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

import { Grid } from '@mui/material';

import { VariantButton } from '.';
import { MotionContainer, MotionComponent, varBounceOut } from '../../core/animate';

export default function Variant({ contents, answer }) {
    const backgroundColors = ['#2F6DAE', '#2C9CA6', '#8E44AD', '#ECA82C', '#E67E22', '#BDC3C7'];
    const wrongColor = '#E63946';
    const rightColor = '#62C370';

    const [chosen, setChosen] = useState(-1);

    const chooseVariant = (i) => {
        setChosen(i);
    };

    return (
        <MotionContainer initial="initial" open>
            <Grid container spacing={1} flex={1}>
                {contents.map((content, i) => (
                    <Grid item sm={12} md key={i}>
                        <AnimatePresence>
                            {chosen === -1 && (
                                <MotionComponent sx={{ height: '100%' }} exit={varBounceOut}>
                                    <VariantButton
                                        variant="contained"
                                        fullWidth
                                        backgroundColor={backgroundColors[i]}
                                        onClick={() => chooseVariant(i)}
                                    >
                                        {content}
                                    </VariantButton>
                                </MotionComponent>
                            )}
                            {i === chosen && (
                                <MotionComponent sx={{ height: '100%' }}>
                                    <VariantButton
                                        variant="contained"
                                        fullWidth
                                        backgroundColor={wrongColor}
                                        onClick={() => chooseVariant(i)}
                                    >
                                        {content}
                                    </VariantButton>
                                </MotionComponent>
                            )}
                            {i === answer && chosen !== -1 && (
                                <MotionComponent sx={{ height: '100%' }}>
                                    <VariantButton
                                        variant="contained"
                                        fullWidth
                                        backgroundColor={rightColor}
                                        onClick={() => chooseVariant(i)}
                                    >
                                        {content}
                                    </VariantButton>
                                </MotionComponent>
                            )}
                        </AnimatePresence>
                    </Grid>
                ))}
            </Grid>
        </MotionContainer>
    );
}

Variant.propTypes = {
    contents: PropTypes.arrayOf(PropTypes.string),
    answer: PropTypes.number
};
