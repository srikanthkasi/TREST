import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ConnectedMainLayout } from '../../layout/MainLayout';
import {
    CircularProgress,
    Grid,
    Paper,
    Typography,
    withStyles,
    InputAdornment,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Button, {
    BUTTON_SIZE_SMALL,
    VARIANT_OUTLINED,
} from '../../common/Button';
import UserTable from '../../tables/UserTable';
import styles from './styles';
import {
    TEXT_FOR_FILTER_BY,
    LABEL_FOR_FILTERS,
    LABEL_FOR_PENDING_STATUS_FILTER,
    LABEL_FOR_AUTHORIZED_STATUS_FILTER,
    LABEL_FOR_UNAUTHORIZED_STATUS_FILTER,
    USER_ADMINISTRATION_TABLE_COLUMNS,
    TABLE_SCOPES,
} from './constants';
import {
    NAME_FOR_USER_OKTA_ID_FIELD,
    NAME_FOR_USER_ID_FIELD,
    NAME_FOR_USER_FIRST_NAME_FIELD,
    NAME_FOR_USER_LAST_NAME_FIELD,
    NAME_FOR_USER_STATUS_FIELD,
    NAME_FOR_USER_UPDATED_FIELD,
    USER_STATUS_PENDING,
    USER_STATUS_AUTHORIZED,
    USER_STATUS_UNAUTHORIZED
} from '../../userConstants';
import {
    ROUTE_ADMIN_USER_DETAILS,
    ROUTE_REPORTS,
} from '../../routeConstants';
import {
    fetchUsersRequested,
    setPageIndex,
    setUserSearch,
    setStatusFilter,
} from './actions';
import {
    getItemsPerPage,
    getPageCount,
    getPageIndex,
    getSearch,
    getStatusFilter,
    getTableData,
    isUserAdministrationLoading,
} from './selectors';
import TextInput from '../../common/TextInput';
import { Visibility, Edit, Search } from '@material-ui/icons';
import Select from '../../common/Select';
import { hasAdminGroup } from '../../auth/selectors';

export function UserAdministration(props) {
    const {
        classes,
        loading,
        pageIndex,
        itemsPerPage,
        pageCount,
        data,
        onLoadSearchOrFilterRequested,
        onChangePage,
        statusFilter,
        setStatusFilter,
        search,
        setUserSearch,
        isAdmin,
    } = props;

    const history = useHistory();

    if (!isAdmin) {
        history.push(ROUTE_REPORTS);
    }

    const [sortBy, setSortBy] = useState([]);
    const [debouncedSearch] = useDebounce(search, 500);

    useEffect(() => {
        onLoadSearchOrFilterRequested(
            itemsPerPage,
            pageIndex,
            sortBy,
            debouncedSearch && debouncedSearch.length >= 3
                ? debouncedSearch
                : null,
            statusFilter && statusFilter !== LABEL_FOR_FILTERS
                ? statusFilter
                : null,
        );
    }, [
        onLoadSearchOrFilterRequested,
        debouncedSearch,
        itemsPerPage,
        pageIndex,
        statusFilter,
        sortBy,
    ]);

    return (
        <Paper className={classes.root}>
            <Grid container spacing={8} justify="space-between" wrap="nowrap">
                <Grid item>
                    <Typography variant="h3" color="primary" gutterBottom>
                        User Administration
                    </Typography>
                </Grid>
                <Grid item>
                    <TextInput
                        className={classes.adornedSearch}
                        disabled={loading}
                        onChange={(event) => {
                            setUserSearch(event.target.value);
                        }}
                        name="search"
                        inputProps={{
                            'aria-label': 'Filter Users by keyword',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        value={search}
                        InputLabelProps={{
                            classes: {
                                root: classes.searchInputLabel,
                                shrink: classes.shrunkSearchInputLabel,
                            },
                        }}
                        inputRef={(input) => input && input.focus()}
                    />
                </Grid>
            </Grid>
            <Grid container justify="space-between">
                <Grid item>
                    {TEXT_FOR_FILTER_BY}{' '}
                    <Select
                        id="filterBy"
                        inputProps={{
                            label: 'Select status',
                            'aria-label': 'Filter Users by Status',
                        }}
                        classes={{
                            root: classes.selectRoot,
                        }}
                        disabled={loading}
                        filled
                        native
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        value={statusFilter}
                    >
                        <option value={null}>{LABEL_FOR_FILTERS}</option>
                        <option value={USER_STATUS_PENDING}>
                            {LABEL_FOR_PENDING_STATUS_FILTER}
                        </option>
                        <option value={USER_STATUS_AUTHORIZED}>
                            {LABEL_FOR_AUTHORIZED_STATUS_FILTER}
                        </option>
                        <option value={USER_STATUS_UNAUTHORIZED}>
                            {LABEL_FOR_UNAUTHORIZED_STATUS_FILTER}
                        </option>
                    </Select>
                </Grid>
            </Grid>
            <Grid container direction="column">
                {loading ? (
                    <Grid
                        container
                        item
                        justify="center"
                        className={classes.loading}
                    >
                        <Grid item component={CircularProgress} />
                    </Grid>
                ) : (
                    <UserTable
                        className={classes.table}
                        onPageChange={onChangePage}
                        scopes={TABLE_SCOPES}
                        onSort={setSortBy}
                        TableOptions={{
                            data,
                            columns: USER_ADMINISTRATION_TABLE_COLUMNS,
                            pageIndex,
                            pageCount,
                            manualPagination: true,
                            disableMultiSort: true,
                            manualSortBy: true,
                            autoResetSortBy: false,
                            autoResetPage: true,
                        }}
                        initialState={{
                            pageIndex,
                            pageCount,
                            sortBy,
                        }}
                        renderActionCell={(row) => {
                            const userId = row[NAME_FOR_USER_ID_FIELD];
                            return (
                                <Button
                                    size={BUTTON_SIZE_SMALL}
                                    variant={VARIANT_OUTLINED}
                                    onClick={() => {
                                        if (row && userId) {
                                            const path = ROUTE_ADMIN_USER_DETAILS.replace(
                                                `:${NAME_FOR_USER_ID_FIELD}`,
                                                userId,
                                            );
                                            history.push(path);
                                        }
                                    }}
                                    inputProps={{
                                        'aria-label': `View / Edit`,
                                    }}
                                    className={classes.viewEditButton}
                                >
                                    <div className={classes.actionIcon}>
                                        <Visibility />
                                        View
                                    </div>
                                    <div className={classes.actionSeparator}>
                                        {' '}
                                        /{' '}
                                    </div>
                                    <div className={classes.actionIcon}>
                                        <Edit />
                                        Edit
                                    </div>
                                    {row && userId && (
                                        <span
                                            className={classes.visuallyHidden}
                                        >
                                            {userId}
                                        </span>
                                    )}
                                </Button>
                            );
                        }}
                    />
                )}
                {!loading && (!data || !data.length) && (
                    // No data to be shown - let's indicate that to the user.
                    <Typography align="center">
                        No Users were found. Try clearing
                        your search and/or filter.
                    </Typography>
                )}
            </Grid>
        </Paper>
    );
}

const StyledUserAdministration = withStyles(styles)(UserAdministration);
export default StyledUserAdministration;

StyledUserAdministration.propTypes = {
    loading: PropTypes.bool,
    pageIndex: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            [NAME_FOR_USER_UPDATED_FIELD]:
                PropTypes.string.isRequired,
            [NAME_FOR_USER_FIRST_NAME_FIELD]: PropTypes.string.isRequired,
            [NAME_FOR_USER_LAST_NAME_FIELD]: PropTypes.string.isRequired,
            [NAME_FOR_USER_ID_FIELD]: PropTypes.number.isRequired,
            [NAME_FOR_USER_OKTA_ID_FIELD]:
                PropTypes.string.isRequired,
            [NAME_FOR_USER_STATUS_FIELD]: PropTypes.string.isRequired,
        }),
    ),
    onLoadSearchOrFilterRequested: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    statusFilter: PropTypes.string,
    setStatusFilter: PropTypes.func.isRequired,
    search: PropTypes.string,
    setUserSearch: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
};

StyledUserAdministration.defaultProps = {
    loading: false,
    statusFilter: null,
    search: null,
    isAdmin: false,
};

const mapStateToProps = (state) => ({
    loading: isUserAdministrationLoading(state),
    pageIndex: getPageIndex(state),
    itemsPerPage: getItemsPerPage(state),
    pageCount: getPageCount(state),
    data: getTableData(state),
    statusFilter: getStatusFilter(state),
    search: getSearch(state),
    isAdmin: hasAdminGroup(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLoadSearchOrFilterRequested: (
        itemsPerPage,
        pageIndex,
        sortBy,
        search,
        statusFilter,
    ) =>
        dispatch(
            fetchUsersRequested(
                itemsPerPage,
                pageIndex,
                sortBy,
                search,
                statusFilter,
            ),
        ),
    onChangePage: (pageIndex) => dispatch(setPageIndex(pageIndex)),
    setStatusFilter: (statusFilter) => dispatch(setStatusFilter(statusFilter)),
    setUserSearch: (search) => dispatch(setUserSearch(search)),
});

export const ConnectedUserAdministration = connect(
    mapStateToProps,
    mapDispatchToProps,
)((props) => {
    return (
        <ConnectedMainLayout>
            <StyledUserAdministration {...props} />
        </ConnectedMainLayout>
    );
});
