import { Button } from '@mui/material';
import { lighten, styled } from '@mui/material/styles';

const VariantButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'backgroundColor'
})(({ theme, backgroundColor }) => ({
    color: theme.palette.getContrastText(backgroundColor),
    backgroundColor,
    height: '100% !important',
    '&:hover': {
        backgroundColor: lighten(backgroundColor, 0.3)
    }
}));

export default VariantButton;
