export default (theme) => ({
    root: ({ color }) => ({
        display: 'inline-block',
        borderRadius: theme.common.roundiness,
        textAlign: 'center',
        textDecoration: 'none',
        fontFamily:
            'museo-sans, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: '3.2px',

        '&, &:hover, &:active, &:visited': {
            backgroundColor: theme.palette[color],
            color: theme.palette[`${color}Foreground`],
        },
        '&:hover, &:active': {
            boxShadow: theme.common.boxShadow,
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        },
    }),
    sizeLarge: {
        padding: '14px 32px',
        minWidth: 209,
    },
    sizeSmall: {
        padding: '5px 28px',
    },
    text: {
        textTransform: 'none',
        textDecoration: 'underline',
        letterSpacing: '0px !important',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        padding: '5px 0px !important',
        minWidth: 'auto !important',
    },
    outlinedSecondary: {
        borderColor: theme.palette.white,
        color: theme.palette.white,
        textTransform: 'none',
        fontSize: 20,
        fontWeight: '300 !important',
        letterSpacing: '0px !important',
        minWidth: 224,
        '&, &:hover, &:active, &:visited': {
            borderColor: theme.palette.white,
        },
        '&:hover, &:active': {
            borderColor: theme.palette.white,
        },
    },
    disabled: {
        opacity: theme.common.disabledOpacity,
    },
});
