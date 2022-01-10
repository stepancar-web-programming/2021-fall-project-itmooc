import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Typography, Container, Button } from '@mui/material';

import { useSelector } from 'react-redux';
import { varBounceIn } from '../../core/animate';
import { CustomPaper } from '../../auth/components';
import UserSetting from '../../auth/components/UserSetting';

export default function UpdateInfo() {
    const [dialog, setDialog] = useState(false);

    const { user } = useSelector((state) => state?.auth?.auth);

    const handleClose = () => setDialog(false);
    const handleOpen = () => setDialog(true);

    return (
        <>
            <UserSetting isOpen={dialog} handleClose={handleClose} />
            <CustomPaper sx={{ textAlign: 'center', height: '248px' }}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                    }}
                >
                    <Typography variant="h5" component="p" mb={2}>
                        {user?.login}
                    </Typography>
                    <motion.div animate={varBounceIn.animate}>
                        <Button variant="contained" sx={{ mb: 2 }}>
                            Создать викторину
                        </Button>
                    </motion.div>
                    <motion.div animate={varBounceIn.animate}>
                        <Button variant="outlined" onClick={handleOpen}>
                            Настройки
                        </Button>
                    </motion.div>
                </Container>
            </CustomPaper>
        </>
    );
}
