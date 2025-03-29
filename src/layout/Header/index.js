import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Popover, withStyles } from '@material-ui/core';
import styles from './styles';
import Nav from '../../navigation/Nav';
import NavItemLink from '../../navigation/NavItemLink';
import { ROUTE_LOGOUT } from '../../routeConstants';
import {
    PersonOutlineOutlined as PersonOutlined,
    HelpOutlineOutlined as HelpOutlined,
} from '@material-ui/icons';
import Button, { VARIANT_TEXT } from '../../common/Button';
import { HELP_LINK_TITLE } from './constants';

const Header = ({ classes, name, uas }) => {
    const [helpAnchor, setHelpAnchor] = useState(null);

    const onClickHelp = (event) => {
        setHelpAnchor(event.currentTarget);
    };
    const onHelpClose = () => {
        setHelpAnchor(null);
    };

    const renderHelpIcon = () => (
        <Grid item className={classes.navItem}>
            <Grid
                item
                className={classes.help}
                onClick={onClickHelp}
                component={Button}
                variant={VARIANT_TEXT}
                tabIndex="0"
                disableRipple
            >
                <HelpOutlined fontSize="large" />
                &nbsp;Help
            </Grid>
        </Grid>
    );

    const renderTitle = () => (
        <Grid container alignItems="center">
            <Grid item component={Typography} className={classes.uasTitle}>
                {uas}
            </Grid>
        </Grid>
    );
    const renderWelcomeName = () => (
        <Typography className={classes.name}>Welcome &nbsp;{name}</Typography>
    );
    const renderNavLinks = () => {
        return (
            <Grid container direction="column" justify="flex-end">
                <Grid item container className={classes.welcome}>
                    <Grid item>{renderWelcomeName()}</Grid>
                </Grid>
                <Grid container item justify="flex-end">
                    <Nav>
                        <NavItemLink
                            rootClassName={classes.navItem}
                            to={ROUTE_LOGOUT}
                            onClick={() =>
                                (window.location.href = '/auth/logout')
                            }
                            component={Button}
                            variant={VARIANT_TEXT}
                            tabIndex="0"
                            disableRipple
                        >
                            <PersonOutlined fontSize="large" />
                            &nbsp;Sign Out
                        </NavItemLink>
                        {renderHelpIcon()}
                    </Nav>
                </Grid>
            </Grid>
        );
    };
    return (
        <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="row-reverse"
        >
            <Grid item>{renderNavLinks()}</Grid>
            <Grid item className={classes.title}>
                {renderTitle()}
            </Grid>
            <Popover
                open={!!helpAnchor}
                anchorEl={helpAnchor}
                onClose={onHelpClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: -20,
                    horizontal: 'right',
                }}
            >
                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="center"
                >
                    <Grid item className={classes.helpContent}>
                        <Typography className={classes.helpDirection}>
                            For help, contact:
                        </Typography>
                        <Typography>
                            Call: 1-844-FAA-MyIT (322-6948) <br />
                            Email:{' '}
                            <a
                                href="mailto:helpdesk@faa.gov"
                                target="_blank"
                                rel="noopener noreferrer"
                                title={HELP_LINK_TITLE}
                            >
                                helpdesk@faa.gov
                            </a>
                        </Typography>
                    </Grid>
                </Grid>
            </Popover>
        </Grid>
    );
};
Header.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    uas: PropTypes.string.isRequired,
};

Header.defaultProps = {
    uas: 'TRUST',
    name: 'FAA Administrator',
};

export default withStyles(styles)(Header);
