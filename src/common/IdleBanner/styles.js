export default (theme) => ({
    root: {
        backgroundColor: theme.palette.warning.light,
        borderColor: theme.palette.warning.main,
        borderWidth: 0,
        borderLeftWidth: 16,
        borderStyle: 'solid',
        marginTop: '5%',
    },
    title: {
        fontSize: 36,
        fontWeight: 900,
    },
    content: {
        fontSize: 16,
        fontWeight: 500,
    },
    button: {
        minWidth: 420,
    },
    buttonLabel: {
        letterSpacing: 3.2,
        fontWeight: 700,
    },
    cardActions: {
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: -10,
        '&>*': {
            '&:last-child': {
                marginLeft: 40,
            },
        },
    },
    warningIcon: {
        fontSize: 70,
        marginRight: 50,
    },
});
