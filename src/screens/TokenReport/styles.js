export default (theme) => ({
    root: {
        margin: '5% 0',
        padding: '5%',
        backgroundColor: theme.palette.white,
    },
    autocomplete: {
        width: 300,
        marginTop: 8,
        '& .MuiAutocomplete-clearIndicatorDirty': {
            visibility: 'visible',
        },
    },
    gridSpacer: {
        marginLeft: '1em',
    },
    viewEditButton: {
        fontSize: 12,
        paddingLeft: 22,
        paddingRight: 22,
    },
    loading: {
        margin: 50,
    },
    selectRoot: {
        fontSize: 16,
    },
});
