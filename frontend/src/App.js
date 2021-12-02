import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import ScrollToTop from './modules/core/components/ScrollToTop';

export default function App() {
    return (
        <ThemeConfig>
            <ScrollToTop />
            <GlobalStyles />
            <Router />
        </ThemeConfig>
    );
}
