import React, { useEffect } from 'react';
import { useTheme } from '@emotion/react';

import Page from '../modules/core/components/Page';
import { Quiz } from '../modules/quiz/containers';

export default function QuizPage() {
    const theme = useTheme();

    useEffect(() => {
        document.body.style.background = '#000000';
    });

    return (
        <Page title="Для студентов - ITMOOC">
            <Quiz />
        </Page>
    );
}
