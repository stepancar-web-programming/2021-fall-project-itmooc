import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

export default function Logo({ type = 'logo', sx }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const side = isMobile ? 30 : 40;

    return (
        <Box
            component="img"
            src={`/static/logos/${type}.png`}
            sx={{ height: side, ...(type === 'logo' && { width: side }), ...sx }}
        />
    );
}

Logo.propTypes = {
    type: PropTypes.oneOf(['text-logo', 'text-logo-white']),
    sx: PropTypes.object
};
