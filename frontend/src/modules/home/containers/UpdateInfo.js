import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Typography, Container, Button } from '@mui/material';

import { useSelector } from 'react-redux';
import { varBounceIn } from '../../core/animate';
import { CustomPaper, UserSetting, CreateQuiz } from '../../auth/components';

export default function UpdateInfo() {
    const [dialogSetting, setDialogSetting] = useState(false);
    const [dialogCreate, setDialogCreate] = useState(false);

    const { user } = useSelector((state) => state?.auth?.auth);

    return (
        <>
            {user && <UserSetting isOpen={dialogSetting} handleClose={() => setDialogSetting(false)} />}
            <CreateQuiz isOpen={dialogCreate} handleClose={() => setDialogCreate(false)} />
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
                        <Button variant="contained" sx={{ mb: 2 }} onClick={() => setDialogCreate(true)}>
                            Создать викторину
                        </Button>
                    </motion.div>
                    <motion.div animate={varBounceIn.animate}>
                        <Button variant="outlined" onClick={() => setDialogSetting(true)}>
                            Настройки
                        </Button>
                    </motion.div>
                </Container>
            </CustomPaper>
        </>
    );
}
