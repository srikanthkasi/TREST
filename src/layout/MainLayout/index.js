import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import styles from './styles';
import Screen from '../../common/Screen';
import CommonPropTypes from '../../common/propTypes';
import { getUserName, hasAdminGroup } from '../../auth/selectors';
import { getPathnameAsBreadcrumbs } from '../../navigation/selectors';
import ErrorList from '../../common/errors/ErrorList';
import Runner from '../Runner';
import Header from '../Header';
import SubHeader from '../SubHeader';
import Footer from '../Footer';
import IdleBanner from '../../common/IdleBanner';
import Countdown from 'react-countdown';
import IdleTimer from 'react-idle-timer';
import { COUNTDOWN_TIME, TIMEOUT_TIME } from './constants';

function MainLayout({
    classes,
    className,
    component: Component,
    children,
    errors,
    name,
    currentRoute,
    isAdmin,
}) {
    const [showIdleBanner, setShowIdleBanner] = useState();
    const idleTimerRef = useRef(null);
    const sessionTimeoutRef = useRef(null);
    const onIdle = () => {
        setShowIdleBanner(true);
        sessionTimeoutRef.current = setTimeout(logOut, 300 * 1000);
    };
    const logOut = () => {
        setShowIdleBanner(false);
        clearTimeout(sessionTimeoutRef.current);
        window.location.href = '/auth/logout';
    };

    const renderer = ({ minutes, seconds }) => {
        const minutesDisplay = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondsDisplay = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return <span>{`${minutesDisplay}:${secondsDisplay}`}</span>;
    };
    return (
        <>
            {
                // NOTE: DO NOT APPLY Grid[spacing] TO ANY OF THESE BLOCKS!
            }
            <Grid
                container
                direction="column"
                className={classes.root}
                wrap="nowrap"
            >
                <Grid item justify="center" className={classes.runner}>
                    <Container item alignItems="flex-start" maxWidth="xl">
                        <Grid container item xs={12}>
                            <Grid item component={Runner} />
                        </Grid>
                    </Container>
                </Grid>
                <Grid item justify="center" className={classes.header}>
                    <Container item alignItems="flex-start" maxWidth="xl">
                        <Grid container item>
                            <Grid item component={Header} name={name} />
                            <IdleTimer
                                ref={idleTimerRef}
                                timeout={TIMEOUT_TIME}
                                onIdle={onIdle}
                            />
                        </Grid>
                    </Container>
                </Grid>
                <Grid item justify="center" className={classes.subHeader}>
                    <Grid container item>
                        <Grid
                            item
                            component={SubHeader}
                            currentRoute={currentRoute}
                            isAdmin={isAdmin}
                        />
                    </Grid>
                </Grid>
                {errors && (
                    <Grid item justify="center" className={classes.errors}>
                        <Container item alignItems="flex-start">
                            <Grid container item>
                                <Grid item>
                                    {errors ? (
                                        <ErrorList errors={errors} />
                                    ) : null}
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                )}
                <Grid
                    container
                    item
                    direction="row"
                    justify="center"
                    className={classes.appContent}
                >
                    <Grid item>
                        <Container alignItems="flex-start" xs={12}>
                            {showIdleBanner && (
                                <Grid item>
                                    <IdleBanner
                                        CloseButtonProps={{
                                            onClick: () =>
                                                setShowIdleBanner(false), // TODO is this the expected behavior?
                                        }}
                                        PositiveButtonProps={{
                                            onClick: () =>
                                                setShowIdleBanner(false), // TODO is this the expected behavior?
                                        }}
                                        NegativeButtonProps={{
                                            onClick: logOut,
                                        }}
                                        Countdown={() => (
                                            <Countdown
                                                date={
                                                    Date.now() + COUNTDOWN_TIME
                                                }
                                                renderer={renderer}
                                                onComplete={logOut}
                                            />
                                        )}
                                    />
                                </Grid>
                            )}
                            <Grid
                                container
                                item
                                direction="column"
                                alignItems="stretch"
                            >
                                {children}
                            </Grid>
                        </Container>
                    </Grid>
                    <Grid container item direction="row" justify="flex-end">
                        <Grid item className={classes.version}>
                            <Typography color="secondary">
                                v.release/{process.env.REACT_APP_VERSION}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    justify="center"
                    className={classes.footer}
                >
                    <Grid item component={Footer} />
                </Grid>
            </Grid>
        </>
    );
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: CommonPropTypes.component,
    children: PropTypes.node,
    errors: CommonPropTypes.errors,
    name: PropTypes.string,
    currentRoute: PropTypes.string,
    isAdmin: PropTypes.bool,
};

MainLayout.defaultProps = {
    component: Screen,
    className: null,
    children: null,
    errors: null,
    name: '',
    currentRoute: '',
    isAdmin: false,
};

const StyledMainLayout = withStyles(styles)(MainLayout);

export default StyledMainLayout;

const mapStateToProps = (state) => ({
    name: getUserName(state),
    currentRoute: getPathnameAsBreadcrumbs(state),
    isAdmin: hasAdminGroup(state),
});

export const ConnectedMainLayout = connect(mapStateToProps)(StyledMainLayout);
