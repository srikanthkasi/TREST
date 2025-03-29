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
import TrustTable from '../../tables/Table';
import styles from './styles';
import {
    TEXT_FOR_FILTER_BY,
    LABEL_FOR_FILTERS,
    LABEL_FOR_ACTIVE_STATUS_FILTER,
    LABEL_FOR_INACTIVE_STATUS_FILTER,
    TA_ACCOUNT_ADMINISTRATION_TABLE_COLUMNS,
    TABLE_SCOPES,
} from './constants';
import {
    NAME_FOR_TEST_AUTHORITY_REGISTRATION_CODE_FIELD,
    NAME_FOR_TEST_AUTHORITY_ID_FIELD,
    NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
    NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
    NAME_FOR_TEST_AUTHORITY_UPDATED_FIELD,
    TEST_AUTHORITY_STATUS_ACTIVE,
    TEST_AUTHORITY_STATUS_INACTIVE,
} from '../../testAuthorityConstants';
import {
    ROUTE_ADMIN_CREATE_TEST_AUTHORITY,
    ROUTE_ADMIN_TEST_AUTHORITY_DETAILS,
    ROUTE_REPORTS,
} from '../../routeConstants';
import {
    fetchTestAuthoritiesRequested,
    setPageIndex,
    setSearch,
    setStatusFilter,
} from './actions';
import {
    getItemsPerPage,
    getPageCount,
    getPageIndex,
    getSearch,
    getStatusFilter,
    getTableData,
    isAccountAdministrationLoading,
} from './selectors';
import TextInput from '../../common/TextInput';
import { Visibility, Edit, Search } from '@material-ui/icons';
import Select from '../../common/Select';
import { hasAdminGroup } from '../../auth/selectors';

export function AccountAdministration(props) {
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
        setSearch,
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
                        TA Account Administration
                    </Typography>
                </Grid>
                <Grid item>
                    <TextInput
                        className={classes.adornedSearch}
                        disabled={loading}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        name="search"
                        inputProps={{
                            'aria-label': 'Filter TA Accounts by keyword',
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
                    <Button
                        onClick={() => {
                            history.push(ROUTE_ADMIN_CREATE_TEST_AUTHORITY);
                        }}
                    >
                        Add New TA
                    </Button>
                </Grid>
                <Grid item>
                    {TEXT_FOR_FILTER_BY}{' '}
                    <Select
                        id="filterBy"
                        inputProps={{
                            label: 'Select status',
                            'aria-label': 'Filter TA Accounts by Status',
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
                        <option value={TEST_AUTHORITY_STATUS_ACTIVE}>
                            {LABEL_FOR_ACTIVE_STATUS_FILTER}
                        </option>
                        <option value={TEST_AUTHORITY_STATUS_INACTIVE}>
                            {LABEL_FOR_INACTIVE_STATUS_FILTER}
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
                    <TrustTable
                        className={classes.table}
                        onPageChange={onChangePage}
                        scopes={TABLE_SCOPES}
                        onSort={setSortBy}
                        TableOptions={{
                            data,
                            columns: TA_ACCOUNT_ADMINISTRATION_TABLE_COLUMNS,
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
                            const taId = row[NAME_FOR_TEST_AUTHORITY_ID_FIELD];
                            return (
                                <Button
                                    size={BUTTON_SIZE_SMALL}
                                    variant={VARIANT_OUTLINED}
                                    onClick={() => {
                                        if (row && taId) {
                                            const path = ROUTE_ADMIN_TEST_AUTHORITY_DETAILS.replace(
                                                `:${NAME_FOR_TEST_AUTHORITY_ID_FIELD}`,
                                                taId,
                                            );
                                            history.push(path);
                                        }
                                    }}
                                    inputProps={{
                                        'aria-label': `View / Edit ${taId}`,
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
                                    {row && taId && (
                                        <span
                                            className={classes.visuallyHidden}
                                        >
                                            {taId}
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
                        No Test Administrator accounts were found. Try clearing
                        your search and/or filter.
                    </Typography>
                )}
            </Grid>
        </Paper>
    );
}

const StyledAccountAdministration = withStyles(styles)(AccountAdministration);
export default StyledAccountAdministration;

StyledAccountAdministration.propTypes = {
    onLoad: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    pageIndex: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            [NAME_FOR_TEST_AUTHORITY_UPDATED_FIELD]:
                PropTypes.string.isRequired,
            [NAME_FOR_TEST_AUTHORITY_NAME_FIELD]: PropTypes.string.isRequired,
            [NAME_FOR_TEST_AUTHORITY_ID_FIELD]: PropTypes.string.isRequired,
            [NAME_FOR_TEST_AUTHORITY_REGISTRATION_CODE_FIELD]:
                PropTypes.string.isRequired,
            [NAME_FOR_TEST_AUTHORITY_STATUS_FIELD]: PropTypes.string.isRequired,
        }),
    ),
    onLoadSearchOrFilterRequested: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    statusFilter: PropTypes.string,
    setStatusFilter: PropTypes.func.isRequired,
    search: PropTypes.string,
    setSearch: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
};

StyledAccountAdministration.defaultProps = {
    loading: false,
    statusFilter: null,
    search: null,
    isAdmin: false,
};

const mapStateToProps = (state) => ({
    loading: isAccountAdministrationLoading(state),
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
            fetchTestAuthoritiesRequested(
                itemsPerPage,
                pageIndex,
                sortBy,
                search,
                statusFilter,
            ),
        ),
    onChangePage: (pageIndex) => dispatch(setPageIndex(pageIndex)),
    setStatusFilter: (statusFilter) => dispatch(setStatusFilter(statusFilter)),
    setSearch: (search) => dispatch(setSearch(search)),
});

export const ConnectedAccountAdministration = connect(
    mapStateToProps,
    mapDispatchToProps,
)((props) => {
    return (
        <ConnectedMainLayout>
            <StyledAccountAdministration {...props} />
        </ConnectedMainLayout>
    );
});
