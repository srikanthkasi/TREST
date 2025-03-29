export default (theme) => ({
    paper: {
        backgroundColor: theme.palette.white,
        padding: '5px 15px',

        [theme.breakpoints.up('lg')]: {
            padding: '30px 250px',
        },
    },
    extraActionGrow: {
        flexGrow: '1',
    },
    actionButtons: {
        padding: '20px 16px',
    },
    requiredFieldMessage: {
        marginLeft: 10,
    },
    submitButton: {
        marginLeft: '10px',
    },
    title: {
        fontSize: 54,
        fontWeight: 500,
        [theme.breakpoints.down('sm')]: {
            fontSize: 26,
        },
    },
});
