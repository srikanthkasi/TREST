import React from 'react';
import { withStyles } from '@material-ui/core';
import { PrintOutlined as PrintIcon } from '@material-ui/icons';
import Button, { BUTTON_SIZE_SMALL, VARIANT_OUTLINED } from './Button';

const styles = (theme) => ({
    small: {
        display: 'flex',
        maxHeight: 35,
        maxWidth: 126,
        textTransform: 'none',
        letterSpacing: 0,

        [theme.breakpoints.down('md')]: {
            marginTop: 20,
        },
    },
    icon: {
        marginRight: 10,
    },
});

const PrintButton = ({ classes, ...props }) => (
    <Button classes={{ sizeSmall: classes.small }} {...props}>
        <PrintIcon classes={{ root: classes.icon }} />
        Print
    </Button>
);

PrintButton.defaultProps = {
    variant: VARIANT_OUTLINED,
    size: BUTTON_SIZE_SMALL,
};

export default withStyles(styles)(PrintButton);
