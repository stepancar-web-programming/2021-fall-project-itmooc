import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

import { VariantButton } from '.';

export default function Variant({ contents }) {
    const backgroundColors = ['#2F6DAE', '#2C9CA6', '#8E44AD', '#ECA82C', '#E67E22', '#BDC3C7'];

    return (
        <Grid container spacing={1} flex={1}>
            {contents.map((content, i) => (
                <Grid item sm={12} md key={i}>
                    <VariantButton variant="contained" fullWidth backgroundColor={backgroundColors[i]}>
                        {content}
                    </VariantButton>
                </Grid>
            ))}
        </Grid>
    );
}

Variant.propTypes = {
    contents: PropTypes.arrayOf(PropTypes.string)
};
