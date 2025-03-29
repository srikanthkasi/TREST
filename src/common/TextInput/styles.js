export default (theme) => {
    const fieldLabel = {
        fontSize: 20,
        fontWeight: 500,
        color: theme.palette.black,
        marginBottom: 10,
    };
    const { fontFamily } = theme;
    return {
        root: {},
        input: {
            padding: '20px 25px',
            fontSize: 20,
            fontWeight: 500,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.lightGray,
            fontFamily,
            '&:disabled': {
                opacity: 0.5,
            },
        },
        fieldLabel,
        errorFieldLabel: {
            ...fieldLabel,
            color: theme.palette.error.main,
        },
    };
};
