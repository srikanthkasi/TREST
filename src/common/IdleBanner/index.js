import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    Grid,
    Typography,
    withStyles,
} from '@material-ui/core';
import { CloseRounded as CloseIcon } from '@material-ui/icons';
import { ReactComponent as WarningIcon } from './idle_warning_icon.svg';
import styles from './styles';
import { IDLE_BANNER_CONTENT_TEXT, IDLE_BANNER_TITLE } from './constants';
import Button from '../Button';

const IdleBanner = (props) => {
    const {
        classes,
        CloseButtonProps,
        PositiveButtonProps,
        NegativeButtonProps,
        Countdown,
        ...restProps
    } = props;
    return (
        <Card
            classes={{
                root: classes.root,
            }}
            {...restProps}
        >
            <CardContent>
                <Grid container wrap="nowrap" justify="space-between">
                    <Grid item>
                        <WarningIcon className={classes.warningIcon} />
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom className={classes.title}>
                            {IDLE_BANNER_TITLE}
                        </Typography>
                        <Typography>
                            {IDLE_BANNER_CONTENT_TEXT}
                            {Countdown && <Countdown />}
                        </Typography>
                        <CardActions classes={{ root: classes.cardActions }}>
                            <Button
                                classes={{
                                    root: classes.button,
                                    label: classes.buttonLabel,
                                }}
                                color="secondary"
                                {...PositiveButtonProps}
                            >
                                Stay signed in
                            </Button>
                            <Button
                                classes={{
                                    root: classes.button,
                                    label: classes.buttonLabel,
                                }}
                                {...NegativeButtonProps}
                            >
                                Sign Out
                            </Button>
                        </CardActions>
                    </Grid>
                    <Grid item>
                        <IconButton {...CloseButtonProps}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

IdleBanner.propTypes = {
    classes: PropTypes.object.isRequired,
    CloseButtonProps: PropTypes.object,
    PositiveButtonProps: PropTypes.object,
    NegativeButtonProps: PropTypes.object,
    Countdown: PropTypes.elementType,
};

IdleBanner.defaultProps = {
    CloseButtonProps: {},
    PositiveButtonProps: {},
    NegativeButtonProps: {},
    elevation: 0,
    square: true,
    Countdown: null,
};

export default withStyles(styles)(IdleBanner);
