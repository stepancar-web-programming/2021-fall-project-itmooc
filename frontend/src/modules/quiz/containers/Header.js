import React, { useState } from 'react';

import { Typography, Box, IconButton, Divider } from '@mui/material';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import TimerIcon from '@mui/icons-material/Timer';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';

import { Logo } from '../../core/components';
import { CustomTooltip } from '../components';

export default function Header() {
    const [timerStyle, setTimerStyle] = useState(true);
    const [fullscreen, setFullscreen] = useState(window.screenTop || window.screenY);

    const switchFullscreen = async () => {
        setFullscreen(!fullscreen);
        if (!window.screenTop && !window.screenY) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ height: '64px' }}>
            <Logo type="text-logo-white" />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mr={1}
                    sx={{
                        bgcolor: (theme) => theme.palette.grey[800],
                        borderRadius: 1,
                        width: '250px',
                        height: '40px'
                    }}
                >
                    <CustomTooltip title="Балл">
                        <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
                            <PlaylistAddCheckIcon color="success" />
                            <Typography color="white" ml={1}>
                                8
                            </Typography>
                        </Box>
                    </CustomTooltip>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'black', width: '2px' }} />
                    <CustomTooltip title="Оставшееся время">
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flex={1}
                            onClick={() => setTimerStyle(!timerStyle)}
                        >
                            {timerStyle ? <TimerIcon color="error" /> : <AccessTimeFilledIcon color="warning" />}
                            <Typography color="white" ml={1}>
                                17:30
                            </Typography>
                        </Box>
                    </CustomTooltip>
                </Box>
                <CustomTooltip title="Полноэкранный">
                    <IconButton
                        sx={{ bgcolor: (theme) => theme.palette.grey[900], borderRadius: 1 }}
                        onClick={switchFullscreen}
                    >
                        {fullscreen ? <ZoomOutMapIcon /> : <ZoomInMapIcon />}
                    </IconButton>
                </CustomTooltip>
            </Box>
        </Box>
    );
}
