import React, { useEffect } from 'react';
import { useTheme } from '@emotion/react';

import Page from '../modules/core/components/Page';
import { Join } from '../modules/auth';

export default function JoinPage() {
    const theme = useTheme();

    useEffect(() => {
        document.body.style.background = `radial-gradient(circle, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;
    });

    return (
        <Page title="Присоединиться - ITMOOC">
            <Join />
        </Page>
    );
}
