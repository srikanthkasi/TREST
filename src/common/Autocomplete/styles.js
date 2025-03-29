export default (theme) => {
    const { fontFamily } = theme;
    return {
        root: {
            fontFamily,
            fontWeight: 500,
            fontSize: 12,
            color: theme.palette.darkGray,
            backgroundColor: theme.palette.background,
            minWidth: 105,
            minHeight: 35,
        },
        paper: {
            backgroundColor: theme.palette.background,
        },
    };
};
