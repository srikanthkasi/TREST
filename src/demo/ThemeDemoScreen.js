import React from 'react';
import { ConnectedMainLayout } from '../layout/MainLayout';
import { Paper, Typography, withStyles } from '@material-ui/core';

export function ThemeDemoScreen(props) {
    const { classes } = props;
    return (
        <ConnectedMainLayout>
            <Paper className={classes.paper}>
                <Typography variant="h1" color="primary">
                    This is a temporary placeholder page.
                </Typography>
                <Typography variant="h2" color="primary">
                    This is a temporary placeholder page.
                </Typography>
                <Typography variant="h3" color="primary">
                    This is a temporary placeholder page.
                </Typography>
                <Typography variant="h4" color="primary">
                    This is a temporary placeholder page.
                </Typography>
                <Typography color="primary">
                    This is a temporary placeholder page. This is a temporary
                    placeholder page. This is a temporary placeholder page. This
                    is a temporary placeholder page. This is a temporary
                    placeholder page. This is a temporary placeholder page. This
                    is a temporary placeholder page. This is a temporary
                    placeholder page. This is a temporary placeholder page. This
                    is a temporary placeholder page. This is a temporary
                    placeholder page. This is a temporary placeholder page. This
                    is a temporary placeholder page. This is a temporary
                    placeholder page. This is a temporary placeholder page. This
                    is a temporary placeholder page. This is a temporary
                    placeholder page. This is a temporary placeholder page. This
                    is a temporary placeholder page. This is a temporary
                    placeholder page. This is a temporary placeholder page. This
                    is a temporary placeholder page. This is a temporary
                    placeholder page. This is a temporary placeholder page. This
                    is a temporary placeholder page. This is a temporary
                    placeholder page. This is a temporary placeholder page. This
                    is a temporary placeholder page. This is a temporary
                    placeholder page.
                </Typography>
            </Paper>
        </ConnectedMainLayout>
    );
}

export default withStyles({
    paper: {
        backgroundColor: 'white',
        padding: '5%',
        margin: '5%',
    },
})(ThemeDemoScreen);
