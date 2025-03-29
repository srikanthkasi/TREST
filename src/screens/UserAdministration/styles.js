export default (theme) => {
    const ellipsedColumn = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 280,
        [theme.breakpoints.down('lg')]: {
            maxWidth: 200,
        },
    };
    return {
        root: {
            margin: '5% 0',
            padding: '5%',
            maxWidth: '95vw',
            backgroundColor: theme.palette.white,
        },
        table: {
            [theme.breakpoints.down('xl')]: {
                '&> tbody > tr > td:nth-child(2)': ellipsedColumn,
                '&> tbody > tr > td:nth-child(4)': ellipsedColumn,
            },
            '&> tbody > tr > td:last-child': {
                marginBottom: -1,
            },
        },
        adornedSearch: {
            backgroundColor: theme.palette.lightGray,
            '& .MuiFilledInput-root': {
                backgroundColor: '#F5F5F5',
            },
            '& .MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)': {
                marginTop: 0,
            },
        },
        searchInputLabel: {
            margin: 7,
            color: theme.palette.darkGray,
            fontSize: 16,
        },
        shrunkSearchInputLabel: {
            margin: 0,
        },
        loading: {
            margin: 50,
        },
        selectRoot: {
            fontSize: 16,
        },
        viewEditButton: {
            fontSize: 12,
            paddingLeft: 22,
            paddingRight: 22,
            whiteSpace: 'nowrap',
        },
        actionSeparator: {
            display: 'inline-block',
            letterSpacing: 1,
            margin: '0 5px',
        },
        actionIcon: {
            display: 'inline-block',
            '&> svg': {
                paddingRight: 5,
                height: 14,
                width: 20,
                verticalAlign: 'text-bottom',
            },
        },
        visuallyHidden: theme.visuallyHidden,
    };
};
