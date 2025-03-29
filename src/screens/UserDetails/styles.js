export default (theme) => {
    const registrationCodeText = {
        padding: 28,
        paddingLeft: 0,
        width: '70%',
        marginLeft: 20,

        [theme.breakpoints.down('sm')]: {
            padding: 14,
            width: '100%',
            marginLeft: 0,
        },
    };
    return {
        root: {
            paddingTop: '5%',
            paddingBottom: '5%',

            [theme.breakpoints.down('lg')]: {
                padding: '2%',
                marginTop: 50,
                marginBottom: 50,
            },
        },
        registrationCodeArea: {
            backgroundColor: theme.palette.lightGray,
            borderRadius: 5,
            paddingTop: '5%',
            paddingBottom: '5%',

            [theme.breakpoints.down('md')]: {
                paddingTop: '2%',
                paddingBottom: '2%',
            },
        },
        registrationCodeLabel: {
            fontSize: 20,
            paddingLeft: 28,
            paddingRight: 28,

            [theme.breakpoints.down('sm')]: {
                paddingLeft: 14,
                paddingRight: 14,
            },
        },
        registrationCodeText,
        registrationCodeValue: {
            ...registrationCodeText,
            fontWeight: 900,
            fontSize: 32,

            [theme.breakpoints.down('sm')]: {
                fontSize: 16,
            },
        },
        registrationCodeStatus: {
            color: theme.palette.primary.main,
            fontSize: 11,
            fontWeight: 'bold',
            letterSpacing: 2.4,
            paddingLeft: 28,
            paddingRight: 28,
            textTransform: 'uppercase',
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 14,
                paddingRight: 14,
            },
            display: 'flex',
            alignItems: 'center',
        },
        statusIcon: {
            fontSize: '1.25rem',
            verticalAlign: 'bottom',
            marginRight: 10,
        },
        extraButton: {
            [theme.breakpoints.up('md')]: {
                width: 302,
            },
        },
    };
};
