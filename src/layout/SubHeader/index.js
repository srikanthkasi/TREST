import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Grid, withStyles } from '@material-ui/core';
import Button, { VARIANT_TEXT } from '../../common/Button';
import { BUTTON_ROUTES } from './constants';
import { ROUTE_ADMIN, ROUTE_USER_ADMIN } from '../../routeConstants';
import styles from './styles';

const SubHeader = ({ classes, isAdmin }) => {
    const history = useHistory();
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            {Object.keys(BUTTON_ROUTES).map((route, id) => {
                if ((ROUTE_ADMIN === route || ROUTE_USER_ADMIN === route) && !isAdmin) {
                    return null;
                }
                return (
                    <Grid item key={`route-button-${id}`}>
                        <Button
                            variant={VARIANT_TEXT}
                            className={classes.button}
                            onClick={() => {
                                history.push(route);
                            }}
                        >
                            {BUTTON_ROUTES[route]}
                        </Button>
                    </Grid>
                );
            })}
        </Grid>
    );
};
SubHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool,
};
SubHeader.defaultProps = {
    isAdmin: false,
};

export default withStyles(styles)(SubHeader);
