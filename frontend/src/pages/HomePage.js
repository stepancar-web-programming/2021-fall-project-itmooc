import React, { useEffect } from 'react';
import { useTheme } from '@emotion/react';

import { Page } from '../modules/core/components';
import { DrawerMenu } from '../modules/menu';
import { HomeContainer } from '../modules/home';

export default function QuizPage() {
    const theme = useTheme();

    useEffect(() => {
        // document.body.style.background = `radial-gradient(circle, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;
        // document.body.style.background = `${theme.palette.primary.darker}`;
    });

    return (
        <Page title="Для студентов - ITMOOC">
            <DrawerMenu Component={HomeContainer} />
        </Page>
    );
}
