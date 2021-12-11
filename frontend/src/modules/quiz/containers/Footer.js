import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, IconButton, LinearProgress, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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

export default function Footer({ current, all, setPage }) {
    const [musicOn, setMusicOn] = useState(true);
    const [soundOn, setSoundOn] = useState(true);

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" p={2} sx={{ height: '64px' }}>
            <Container disableGutters>
                <CustomTooltip title="Музыка">
                    <IconButton
                        sx={{
                            bgcolor: (theme) => theme.palette.warning.main,
                            borderRadius: 2,
                            color: 'white',
                            px: 2,
                            mr: 1
                        }}
                        onClick={() => setMusicOn(!musicOn)}
                    >
                        {musicOn ? <MusicOffIcon /> : <MusicNoteIcon />}
                    </IconButton>
                </CustomTooltip>
                <CustomTooltip title="Звук">
                    <IconButton
                        sx={{ bgcolor: (theme) => theme.palette.info.main, borderRadius: 2, color: 'white', px: 2 }}
                        onClick={() => setSoundOn(!musicOn)}
                    >
                        {soundOn ? <VolumeUpIcon /> : <VolumeMuteIcon />}
                    </IconButton>
                </CustomTooltip>
            </Container>
            <CustomTooltip title="Процесс">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box display="flex" justifyContent="center" alignItems="center" mr={1} sx={{ minWidth: 35 }}>
                        <Typography variant="h6" component="p" color="white" sx={{ fontSize: '24px !important' }}>
                            {current + 1}
                        </Typography>
                        <Typography variant="h6" component="p" color="white">
                            /{all}
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: 400 }}>
                        <BorderLinearProgress variant="determinate" value={((current + 1) * 100) / all} />
                    </Box>
                </Box>
            </CustomTooltip>
            <Container disableGutters sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomTooltip title="Музыка">
                    <IconButton
                        sx={{
                            bgcolor: (theme) => theme.palette.grey[800],
                            borderRadius: 2,
                            color: 'white',
                            px: 2,
                            mr: 1
                        }}
                        onClick={() => setPage((current + all - 1) % all)}
                    >
                        <ArrowLeftIcon />
                    </IconButton>
                </CustomTooltip>
                <CustomTooltip title="Звук">
                    <IconButton
                        sx={{ bgcolor: (theme) => theme.palette.grey[800], borderRadius: 2, color: 'white', px: 2 }}
                        onClick={() => setPage((current + 1) % all)}
                    >
                        <ArrowRightIcon />
                    </IconButton>
                </CustomTooltip>
            </Container>
        </Box>
    );
}

Footer.propTypes = {
    current: PropTypes.number,
    all: PropTypes.number,
    setPage: PropTypes.func
};
