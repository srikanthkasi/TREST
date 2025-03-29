export default (theme) => ({
    root: {
        backgroundColor: theme.palette.primary,
        color: theme.palette.primaryForeground,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start',

        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
});
