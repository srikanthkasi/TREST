export default (theme) => ({
    root: {
        minHeight: '100vh',
    },
    runner: {
        backgroundColor: theme.palette.runnerBlue,
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.runnerStroke,
    },
    header: {
        backgroundColor: theme.palette.white,
        padding: '1rem 0',
    },
    subHeader: {
        margin: '0.5rem 0',
    },
    appContent: {
        backgroundColor: theme.palette.white,
        flexGrow: 1,
        '& > div': {
            flexGrow: 1,
        },
    },
    footer: {
        padding: '32px 24px 24px',
        backgroundColor: theme.palette.lightGray,
    },
    version: {
        marginRight: '24px',
        marginBottom: 5,
        '& p': {
            fontSize: 14,
            fontStyle: 'italic',
        },
    },
});
