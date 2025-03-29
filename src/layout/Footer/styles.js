export default (theme) => ({
    root: {
        background: `transparent linear-gradient(180deg, ${theme.palette.footerGradientStart} 0%, ${theme.palette.footerGradientEnd} 100%)`,
        padding: '28px 38px',
        borderRadius: 15,
    },
    text: {
        color: theme.palette.white,
        fontSize: 28,
        width: 220,
        lineHeight: '30px',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 20,
            width: 160,
            lineHeight: '30px',
        },
    },
});
