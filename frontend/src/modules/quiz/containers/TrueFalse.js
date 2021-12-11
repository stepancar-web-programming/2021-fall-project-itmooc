import React from 'react';

import { Grid } from '@mui/material';

import { Question } from '../components';
import { VariantButton } from '../components/Variant';

export default function TrueFalse() {
    return (
        <>
            <Question question="Trong học kỳ gần nhất, Khánh đã bị 1 con điểm 3 và 1 môn nợ. Hỏi Khánh có nguy cơ bị đuổi học hay không?" />
            <Grid container spacing={1} flex={1}>
                <Grid item sm={12} md>
                    <VariantButton variant="contained" fullWidth backgroundColor="#2F6DAE">
                        ВЕРНО
                    </VariantButton>
                </Grid>
            </Grid>
        </>
    );
}
