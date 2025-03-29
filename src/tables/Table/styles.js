const pageButton = {
    marginTop: 30,
    minWidth: 28,
    height: 28,
    padding: 0,
    borderColor: 'transparent',
    letterSpacing: 0,
    fontSize: 16,
};

export default (theme) => {
    const rowCell = {
        color: theme.palette.darkGray,
        fontSize: 16,
        fontFamily:
            'museo-sans, "Helvetica Neue", Helvetica, Arial, sans-serif',
    };

    return {
        container: {
            padding: 1,
            maxWidth: '90vw',
        },
        headCell: {
            color: theme.palette.primary.main,
            fontSize: 16,
            fontWeight: 500,
            fontFamily:
                'museo-sans, "Helvetica Neue", Helvetica, Arial, sans-serif',

            borderBottomColor: theme.palette.primary.main,
            borderBottomWidth: 2,
            whiteSpace: 'nowrap',
        },
        visuallyHidden: theme.visuallyHidden,
        rowCell,
        actionCell: {
            ...rowCell,
            display: 'flex',
            justifyContent: 'flex-end',
        },
        activePageButton: {
            ...pageButton,
        },
        inactivePageButton: {
            ...pageButton,
            color: theme.palette.darkGray,
            opacity: 0.75,
        },
        sortIcon: {
            marginLeft: 5,
            paddingTop: 5,
        },
        pagination: {
            marginTop: 10,
        },
    };
};
