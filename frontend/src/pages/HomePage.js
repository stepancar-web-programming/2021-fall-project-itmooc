import React, { useEffect } from 'react';

import { Page } from '../modules/core/components';
import { DrawerMenu } from '../modules/menu';
import { Home } from '../modules/home';

export default function QuizPage() {
    useEffect(() => {
        // document.body.style.background = `radial-gradient(circle, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;
        // document.body.style.background = `${theme.palette.primary.darker}`;
    });

    return (
        <Page title="Для студентов - ITMOOC">
            <DrawerMenu Component={Home} />
        </Page>
    );
}
