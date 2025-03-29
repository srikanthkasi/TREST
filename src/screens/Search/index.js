import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Typography,
    withStyles,
} from '@material-ui/core';
import { Check as ValidIcon, Clear as NotFoundIcon } from '@material-ui/icons';
import styles from './styles';
import {
    SEARCH_FIELD_LABEL_NO_PRIOR_SEARCH,
    SEARCH_FIELD_LABEL_PREVIOUS_SEARCH_OCCURRED,
    SEARCH_TITLE,
    SEARCH_TITLE_NOT_FOUND,
    SEARCH_TITLE_VALID_TOKEN,
    TOKEN_VALID_LENGTH,
    DATE_AND_TIME,
} from './constants';
import SearchTextInput from './SearchTextInput';
import Button from '../../common/Button';
import PrintButton from '../../common/PrintButton';
import { noop } from '../../common/utils';
import { connect } from 'react-redux';
import { ConnectedMainLayout } from '../../layout/MainLayout';
import {
    getPreviousSearchedToken,
    isSearchInProgress,
    wasPreviousSearchedTokenFound,
} from './selectors';
import { searchTokensRequested } from './actions';
import { DateTime } from 'luxon';

const Search = (props) => {
    const {
        classes,
        previousSearchedToken,
        previousSearchedTokenFound,
        onSubmit,
        searchInProgress,
    } = props;

    const [searchText, setSearchText] = useState(null);
    const [shouldRenderPrintHTML, setShouldRenderPrintHTML] = useState(false);
    const [printInProgress, setPrintInProgress] = useState(false);

    const cleanup = () => {
        setShouldRenderPrintHTML(false);
        setPrintInProgress(false);
    };

    useEffect(() => {
        if (shouldRenderPrintHTML && !printInProgress) {
            setPrintInProgress(true);
            window.print();
            window.onafterprint = cleanup();
        }
    }, [shouldRenderPrintHTML, printInProgress]);

    const renderTitle = useCallback(() => {
        if (previousSearchedToken && !searchInProgress) {
            if (previousSearchedTokenFound) {
                return SEARCH_TITLE_VALID_TOKEN;
            } else {
                return SEARCH_TITLE_NOT_FOUND;
            }
        } else {
            return SEARCH_TITLE;
        }
    }, [previousSearchedToken, previousSearchedTokenFound, searchInProgress]);
    const title = renderTitle();

    const renderTitleIcon = useCallback(() => {
        if (title === SEARCH_TITLE) {
            return '';
        } else if (title === SEARCH_TITLE_VALID_TOKEN) {
            return <ValidIcon className={classes.validIcon} />;
        } else if (title === SEARCH_TITLE_NOT_FOUND) {
            return <NotFoundIcon className={classes.notFoundIcon} />;
        }
    }, [classes, title]);

    const renderSubtitle = useCallback(() => {
        if (previousSearchedToken && !searchInProgress) {
            return (
                <span aria-live="polite">
                    {`Token `}
                    <strong>{previousSearchedToken} </strong>
                    {`was `}
                    {previousSearchedTokenFound ? '' : 'not '}
                    located in the database
                </span>
            );
        } else {
            return null;
        }
    }, [previousSearchedToken, previousSearchedTokenFound, searchInProgress]);
    const subtitle = renderSubtitle();

    const showPrint = !!subtitle;
    const renderPrint = useCallback(() => {
        return showPrint ? (
            <PrintButton onClick={() => setShouldRenderPrintHTML(true)} />
        ) : null;
    }, [showPrint]);

    const renderPrintable = () => {
        return (
            <Grid container direction="column" className={classes.root}>
                <Grid item container alignItems="center">
                    <Grid item className={classes.icon}>
                        {renderTitleIcon()}
                    </Grid>
                    <Grid
                        item
                        component={Typography}
                        className={classes.title}
                        color="primary"
                    >
                        {title}
                    </Grid>
                </Grid>
                <Grid item component={Typography} gutterBottom>
                    {subtitle}
                </Grid>
                <Typography>
                    Search results as of{' '}
                    {DateTime.local().toFormat(DATE_AND_TIME)}
                </Typography>
            </Grid>
        );
    };

    const [searchFieldError, setSearchFieldError] = useState();

    const renderContent = useCallback(() => {
        return (
            <Grid container item direction="column" className={classes.content}>
                {subtitle && (
                    <Grid item>
                        {subtitle}
                        <Typography>
                            Search results as of{' '}
                            {DateTime.local().toFormat(DATE_AND_TIME)}
                        </Typography>
                    </Grid>
                )}
                {subtitle && (
                    <Grid item>
                        <Divider className={classes.divider} />
                    </Grid>
                )}
                <Grid container item justify="center">
                    {searchInProgress ? (
                        <CircularProgress />
                    ) : (
                        <SearchTextInput
                            value={searchText}
                            onChange={(text) => {
                                setSearchText(text);
                                setSearchFieldError(null);
                            }}
                            fieldLabel={
                                subtitle
                                    ? SEARCH_FIELD_LABEL_PREVIOUS_SEARCH_OCCURRED
                                    : SEARCH_FIELD_LABEL_NO_PRIOR_SEARCH
                            }
                            error={
                                searchText &&
                                searchText.length > TOKEN_VALID_LENGTH
                                    ? `Token length too long, must be ${TOKEN_VALID_LENGTH} characters. `
                                    : searchFieldError
                            }
                            disabled={searchInProgress}
                        />
                    )}
                </Grid>
                <Grid container item justify="flex-end">
                    <Button
                        className={classes.submitButton}
                        onClick={() => {
                            if (
                                searchText &&
                                searchText.length === TOKEN_VALID_LENGTH
                            ) {
                                onSubmit(searchText);
                                setSearchText('');
                            } else {
                                setSearchFieldError(
                                    `Token length too short, must be ${TOKEN_VALID_LENGTH} characters.`,
                                );
                            }
                        }}
                        loading={searchInProgress}
                        disabled={searchInProgress || !!searchFieldError}
                        loadingProps={{
                            color: 'secondary',
                            size: 24,
                        }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        );
    }, [
        classes,
        onSubmit,
        searchInProgress,
        searchText,
        subtitle,
        searchFieldError,
    ]);

    return shouldRenderPrintHTML ? (
        renderPrintable()
    ) : (
        <Grid container component={Paper} className={classes.root}>
            <Grid
                item
                container
                alignItems="center"
                wrap="nowrap"
                justify="stretch"
            >
                <Grid item className={classes.icon}>
                    {renderTitleIcon()}
                </Grid>
                <Grid
                    item
                    component={Typography}
                    className={classes.title}
                    color="primary"
                    role="presentation"
                    aria-label={title}
                >
                    {title}
                </Grid>
            </Grid>
            <Grid item container justify="flex-end">
                {renderPrint()}
            </Grid>
            {renderContent()}
        </Grid>
    );
};

Search.propTypes = {
    // From withStyles we expect to get classes
    classes: PropTypes.object.isRequired,

    // Indicate if a previously searched token exists & if it was found or not.
    previousSearchedToken: PropTypes.string,
    previousSearchedTokenFound: PropTypes.bool,

    // Function to call when onSubmit is pressed. WIll be provided the search text as the only arg.
    onSubmit: PropTypes.func,

    // Indicate if the search is in progress
    searchInProgress: PropTypes.bool,
};

Search.defaultProps = {
    previousSearchedToken: null,
    previousSearchedTokenFound: false,
    onSubmit: noop,
    searchInProgress: false,
};

const StyledSearch = withStyles(styles)(Search);
export default StyledSearch;

const mapStateToProps = (state) => ({
    searchInProgress: isSearchInProgress(state),
    previousSearchedToken: getPreviousSearchedToken(state),
    previousSearchedTokenFound: wasPreviousSearchedTokenFound(state),
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (tokenId) => dispatch(searchTokensRequested(tokenId)),
});

export const ConnectedSearch = connect(
    mapStateToProps,
    mapDispatchToProps,
)((props) => {
    return (
        <ConnectedMainLayout>
            <StyledSearch {...props} />
        </ConnectedMainLayout>
    );
});
