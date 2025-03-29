const white = '#ffffff';
const black = 'rgba(0, 0, 0, 0.9)';
const lightGray = '#F5F5F5';
const darkGray = '#333333';
const primary = '#026DB5';
const runnerBlue = '#0076C0';
const runnerStroke = '#1F85C5';
const footerGradientStart = '#002663';
const footerGradientEnd = '#000933';
const secondary = '#747679';
const success = '#2DBC64';
const yellow = '#FEB91D';
const lightYellow = '#FFF0D2';
const lightRed = '#F9DEDD';
const red = '#C32026';
const darkRed = '#932026';

const fontFamily = 'museo-sans, "Helvetica Neue", Helvetica, Arial, sans-serif';

const palette = {
    white,
    black,
    lightGray,
    darkGray,
    background: white,
    foreground: black,
    red,
    yellow,
    darkRed,
    primary: {
        main: primary,
    },
    darkBlue: footerGradientStart,
    runnerBlue,
    runnerStroke,
    footerGradientStart,
    footerGradientEnd,
    secondary: {
        main: secondary,
    },
    typography: {
        fontFamily,
    },
    success: {
        main: success,
    },
    error: {
        main: red,
        light: lightRed,
        dark: darkRed,
    },
    warning: {
        light: lightYellow,
        main: yellow,
    },
};

const typography = {
    normal: {
        fontFamily,
        fontSize: 14,
        lineHeight: '1.2',
    },
};

const breakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
};

/**
 * Basic implementations of `theme.breakpoints.up` and `theme.breakpoints.down` from `@material-ui/core`.
 *
 * @see https://material-ui.com/customization/breakpoints/#api
 *
 * @type {{up: (function(*): string), down: (function(*): string)}}
 */
const breakpointsHelpers = {
    up: (key) => {
        const width =
            typeof breakpoints.values[key] === 'number'
                ? breakpoints.values[key]
                : key;
        return `@media (min-width: ${parseInt(width)}px)`;
    },
    down: (key) => {
        const width =
            typeof breakpoints.values[key] === 'number'
                ? breakpoints.values[key]
                : key;
        const calculatedWidth = Math.max(parseFloat(width) - 0.05, 0);
        return `@media (max-width: ${calculatedWidth.toFixed(2)}px)`;
    },
};

const common = {
    roundiness: 30,
    boxShadow: `0px 4px 10px -5px ${palette.shadow}`,
    disabledOpacity: 0.3,
};

const visuallyHidden = {
    clip: 'rect(1px, 1px, 1px, 1px)',
    whiteSpace: 'nowrap',
    position: 'absolute !important',
    height: '1px',
    width: '1px',
    overflow: 'hidden',
};

const overrides = {
    MuiTypography: {
        body1: {
            fontFamily,
        },
        body2: {
            fontFamily,
        },
        h1: {
            fontFamily,
        },
        h2: {
            fontFamily,
        },
        h3: {
            fontFamily,
        },
        h4: {
            fontFamily,
        },
        h5: {
            fontFamily,
        },
        h6: {
            fontFamily,
        },
        subtitle1: {
            fontFamily,
        },
        subtitle2: {
            fontFamily,
        },
    },
    MuiInputBase: {
        root: {
            borderRadius: 5,
        },
    },
    MuiPickersBasePicker: {
        pickerView: {
            backgroundColor: white,
        },
    },
    MuiInputLabel: {
        root: {
            fontFamily,
            fontSize: 18,
        },
    },
    MuiFormHelperText: {
        root: {
            fontSize: 18,
            fontFamily,
        },
    },
    MuiPaginationItem: {
        icon: {
            color: primary,
        },
    },
};

export default {
    palette,
    typography,
    common,
    visuallyHidden,
    breakpoints: {
        ...breakpoints,
        ...breakpointsHelpers,
    },
    overrides,
    fontFamily,
};
