export default (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    error: {
        background: theme.palette.white,
        color: theme.palette.error.main,
        borderRadius: theme.common.roundiness,
        boxShadow: theme.common.boxShadow,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 16,
        marginTop: 4,
        marginBottom: 4,
    },
});
