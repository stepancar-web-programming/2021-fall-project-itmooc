import { useEffect } from 'react';
import { useTheme } from '@emotion/react';

import Page from '../components/Page';
import JoinPage from '../modules/join/containers/JoinPage';

export default function Join() {
    const theme = useTheme();

    useEffect(() => {
        document.body.style.background = `radial-gradient(circle, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;
    });

    return (
        <Page title="Для студентов - ITMOOC">
            <JoinPage />
        </Page>
    );
}
