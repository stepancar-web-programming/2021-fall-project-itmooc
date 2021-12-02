import React from 'react';

import { useTheme } from '@mui/material/styles';
import { GlobalStyles as GlobalThemeStyles } from '@mui/material';

export default function GlobalStyles() {
    const theme = useTheme();

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link
                href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet"
            />
            <GlobalThemeStyles
                styles={{
                    '*': {
                        margin: 0,
                        padding: 0,
                        boxSizing: 'border-box',
                        fontFamily: '"Nunito", sans-serif'
                    },
                    html: {
                        width: '100%',
                        height: '100%',
                        WebkitOverflowScrolling: 'touch'
                    },
                    body: {
                        width: '100%',
                        height: '100%'
                    },
                    '#root': {
                        width: '100%',
                        height: '100%'
                    },
                    input: {
                        '&[type=number]': {
                            MozAppearance: 'textfield',
                            '&::-webkit-outer-spin-button': {
                                margin: 0,
                                WebkitAppearance: 'none'
                            },
                            '&::-webkit-inner-spin-button': {
                                margin: 0,
                                WebkitAppearance: 'none'
                            }
                        }
                    },
                    textarea: {
                        '&::-webkit-input-placeholder': {
                            color: theme.palette.text.disabled
                        },
                        '&::-moz-placeholder': {
                            opacity: 1,
                            color: theme.palette.text.disabled
                        },
                        '&:-ms-input-placeholder': {
                            color: theme.palette.text.disabled
                        },
                        '&::placeholder': {
                            color: theme.palette.text.disabled
                        }
                    },

                    img: { display: 'block', maxWidth: '100%' },

                    // Lazy Load Img
                    '.blur-up': {
                        WebkitFilter: 'blur(5px)',
                        filter: 'blur(5px)',
                        transition: 'filter 400ms, -webkit-filter 400ms'
                    },
                    '.blur-up.lazyloaded ': {
                        WebkitFilter: 'blur(0)',
                        filter: 'blur(0)'
                    }
                }}
            />
        </>
    );
}
