export default (theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        textAlign: 'center',

        [theme.breakpoints.up('md')]: {
            alignItems: 'center',
        },
    },
    button: {
        margin: 10,

        [theme.breakpoints.up('md')]: {
            width: 300,
        },
    },
});
