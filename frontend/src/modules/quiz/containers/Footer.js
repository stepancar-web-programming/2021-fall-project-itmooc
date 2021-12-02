import React, { useState } from 'react';

import { Box, IconButton } from '@mui/material';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

import { CustomTooltip } from '../components';

export default function Footer() {
    const [musicOn, setMusicOn] = useState(true);
    const [soundOn, setSoundOn] = useState(true);

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" p={2} sx={{ height: '64px' }}>
            <CustomTooltip title="Полноэкранный">
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
            <CustomTooltip title="Полноэкранный">
                <IconButton
                    sx={{ bgcolor: (theme) => theme.palette.info.main, borderRadius: 2, color: 'white', px: 2 }}
                    onClick={() => setSoundOn(!musicOn)}
                >
                    {soundOn ? <VolumeUpIcon /> : <VolumeMuteIcon />}
                </IconButton>
            </CustomTooltip>
        </Box>
    );
}
