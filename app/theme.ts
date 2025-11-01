'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: {
        primary: {
            main: '#FFAE00',
            light: '#F4B850',
            dark: '#D37506',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#BA332B',
            light: '#D86150',
            dark: '#892602',
            contrastText: '#222222',
        },
    },
});