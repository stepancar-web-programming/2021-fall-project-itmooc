import React, { useState } from 'react';

import { Box, IconButton, LinearProgress, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

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

export default function Footer() {
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
        </Box>
    );
}
