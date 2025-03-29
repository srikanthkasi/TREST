export default (theme) => {
    const iconForSmallScreens = {
        width: 32,
        height: 32,
        marginRight: 15,
    };

    const icon = {
        width: 72,
        height: 72,
        marginRight: 30,

        [theme.breakpoints.down('md')]: {
            ...iconForSmallScreens,
        },
    };
    return {
        root: {
            backgroundColor: theme.palette.white,
            padding: '5%',
            paddingLeft: '15%',
            paddingRight: '15%',
            margin: '5% 0',
            maxWidth: '90vw',

            [theme.breakpoints.down('md')]: {
                margin: '1rem 0',
                paddingLeft: '5%',
                paddingRight: '5%',
            },
        },
        title: {
            fontSize: 54,
            fontWeight: 500,

            [theme.breakpoints.down('sm')]: {
                fontSize: 24,
            },
        },
        icon,
        validIcon: {
            ...icon,
            fill: theme.palette.success.main,
        },
        notFoundIcon: {
            ...icon,
            fill: theme.palette.error.main,
        },
        content: {
            marginLeft: icon.width + icon.marginRight,
            paddingRight: 200,

            [theme.breakpoints.down('md')]: {
                marginLeft:
                    iconForSmallScreens.width + iconForSmallScreens.marginRight,
                paddingRight: 0,
            },
        },
        divider: {
            backgroundColor: theme.palette.primary.main,
            marginTop: 20,
            marginBottom: 20,
        },
        submitButton: {
            margin: 24,
            marginRight: 0,
            marginBottom: 0,

            [theme.breakpoints.down('sm')]: {
                minWidth: 'unset',
            },
        },
    };
};
