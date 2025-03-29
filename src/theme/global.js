export default (theme) => ({
    '#root': {
        minHeight: '100%',

        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    html: {
        backgroundColor: theme.palette.lightGray,
    },
    body: {
        backgroundColor: theme.palette.lightGray,
    },
    a: {
        color: theme.palette.primary,
        '&:visited': {
            color: theme.palette.disabled,
        },
        '&:hover, &:active': {
            backgroundColor: theme.palette.primary,
            color: theme.palette.primaryForeground,
        },
    },
});
