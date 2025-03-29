export default (theme) => ({
    root: {
        backgroundColor: theme.palette.lightGray,
        padding: '10px 0',
    },
    button: {
        color: theme.palette.darkGray,
        fontSize: 28,
        margin: '0 50px',

        [theme.breakpoints.down('sm')]: {
            fontSize: 20,
            margin: '10px 100px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 24,
        },
    },
});
