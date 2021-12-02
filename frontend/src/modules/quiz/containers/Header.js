import React, { useState } from 'react';

import { Typography, Box, LinearProgress, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import TimerIcon from '@mui/icons-material/Timer';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CropFreeIcon from '@mui/icons-material/CropFree';

import { Logo } from '../../core/components';
import { CustomTooltip } from '../components';

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
    border: '1px solid white',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        border: '1 solid white',
        backgroundColor: 'black'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: 'white'
    }
}));

export default function Header() {
    const [timerStyle, setTimerStyle] = useState(true);

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ height: '64px' }}>
            <Logo type="text-logo-white" />
            <CustomTooltip title="Процесс">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box display="flex" justifyContent="center" alignItems="center" mr={1} sx={{ minWidth: 35 }}>
                        <Typography variant="h6" component="p" color="white" sx={{ fontSize: '24px !important' }}>
                            5
                        </Typography>
                        <Typography variant="h6" component="p" color="white">
                            /7
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: 400 }}>
                        <BorderLinearProgress variant="determinate" value={700 / 11} />
                    </Box>
                </Box>
            </CustomTooltip>
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
                    <IconButton sx={{ bgcolor: (theme) => theme.palette.grey[400], borderRadius: 1 }}>
                        <CropFreeIcon />
                    </IconButton>
                </CustomTooltip>
            </Box>
        </Box>
    );
}
