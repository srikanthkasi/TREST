export default (theme) => {
    const { fontFamily } = theme;
    return {
        root: {
            fontFamily,
            fontWeight: 500,
            fontSize: 12,
            color: theme.palette.darkGray,
            minWidth: 105,
            minHeight: 35,
        },
        icon: {
            color: theme.palette.primary.main,
        },
    };
};
