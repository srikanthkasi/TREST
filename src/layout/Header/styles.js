export default (theme) => {
    const navItemStyles = {
        fontSize: 16,
        color: theme.palette.darkBlue,
        '&:focus': {
            outline: `1px solid ${theme.palette.darkBlue}`,
        },
    };
    return {
        title: {
            flexGrow: 2,
            marginTop: '0.5rem',
        },
        uasTitle: {
            color: theme.palette.darkBlue,
            fontSize: 47,
            fontWeight: 300,
            [theme.breakpoints.down('sm')]: {
                fontSize: 30,
                paddingTop: 20,
            },
            [theme.breakpoints.down('md')]: {
                fontSize: 42,
                paddingTop: 20,
            },
        },
        name: {
            fontWeight: 500,
            marginLeft: 5,
            fontSize: 20,
            fontStyle: 'italic',
            color: theme.palette.darkGray,
            [theme.breakpoints.down('sm')]: {
                fontSize: 16,
                textAlign: 'right',
            },
        },
        navItem: {
            ...navItemStyles,
            '&> button': {
                ...navItemStyles,
                padding: '0 !important',
            },
            alignSelf: 'flex-end',
            marginLeft: 20,
            color: theme.palette.darkBlue,
        },
        help: {
            cursor: 'pointer',
            color: theme.palette.darkBlue,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 300,
            [theme.breakpoints.up('md')]: {
                fontSize: 20,
            },
        },
        helpContent: {
            backgroundColor: theme.palette.white,
            padding: 40,
            borderRadius: 10,
        },
        helpDirection: {
            fontWeight: 700,
            marginBottom: 12,
        },
        welcome: {
            paddingBottom: 30,
            flexDirection: 'row-reverse',
        },
    };
};
