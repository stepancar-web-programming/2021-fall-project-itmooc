import React, { useState } from 'react';

import { Button, Container, Grid, Typography } from '@mui/material';

import { Question, Variant } from '../components';

export default function SingleChoice() {
    return (
        <>
            <Question question="Trong học kỳ gần nhất, Khánh đã bị 1 con điểm 3 và 1 môn nợ. Hỏi Khánh có nguy cơ bị đuổi học hay không?" />
            <Variant contents={['abc', 'xyz', 'abc', 'xyz', 'abc', 'xyz']} />
        </>
    );
}
