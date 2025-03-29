import 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import PropTypes from 'prop-types';
import { ConnectedMainLayout } from '../../layout/MainLayout';
import {
    CircularProgress,
    Grid,
    Paper,
    TextField,
    Typography,
    withStyles,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import TrustTable from '../../tables/Table';
import styles from './styles';
import {
    NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
    NAME_FOR_TOKEN_REPORT_SUBMITTED_FIELD,
    TA_TOKEN_REPORT_TABLE_COLUMNS,
    LABEL_FOR_FILTER,
    TABLE_SCOPES,
    AUTOCOMPLETE_POPUP_ICON,
    AUTOCOMPLETE_CLOSE_ICON,
} from './constants';
import {
    NAME_FOR_TEST_AUTHORITY_ID_FIELD,
    NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
    NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
    TEST_AUTHORITY_STATUS_INACTIVE,
    TEST_AUTHORITY_STATUS_ACTIVE,
} from '../../testAuthorityConstants';
import {
    fetchTokensRequested,
    exportTokensRequested,
    clearExportTokens,
    storePaginationContext,
    resetPaginationContext,
} from './actions';
import { fetchTaListRequested } from '../../taList/actions';
import { isTaListLoading, getTaList } from '../../taList/selectors';
import {
    getItemsPerPage,
    getPageCount,
    getPageIndex,
    getSearch,
    getStartDate,
    getEndDate,
    getTotal,
    getTableData,
    getExportData,
    isTokenReportLoading,
} from './selectors';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '../../common/Autocomplete';
import Button, {
    BUTTON_SIZE_SMALL,
    VARIANT_OUTLINED,
} from '../../common/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { noop } from '../../common/utils';

function downloadCSV(args) {
    let csv = args.data;
    if (csv == null) return;

    const filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    const data = encodeURI(csv).replace(/#/g, '%23');
    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

export function TokenReport(props) {
    const {
        classes,
        loading,
        pageIndex,
        pageCount,
        data,
        exportData,
        onClickExportTokensRequested,
        onClearExportTokens,
        onLoadTestAuthorities,
        onLoadTokens,
        onChangePage,
        onExit,
        search,
        setSearch,
        taList,
        taLoading,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        total,
    } = props;

    const [sortBy, setSortBy] = useState([]);
    const [debouncedSearch] = useDebounce(search, 500);

    const [dataForDownload, setDataForDownload] = useState(null);
    const [downloadReady, setDownloadReady] = useState(false);

    useEffect(() => {
        if (downloadReady && dataForDownload && dataForDownload.length) {
            downloadCSV({ filename: 'tokenReport.csv', data: dataForDownload });
            setDownloadReady(false);
            setDataForDownload(null);
        }
    }, [downloadReady, setDownloadReady, dataForDownload, setDataForDownload]);

    const renderExport = useCallback(() => {
        const csvExportAction = () => {
            onClickExportTokensRequested(
                sortBy,
                debouncedSearch && debouncedSearch.length >= 3
                    ? debouncedSearch
                    : null,
                startDate,
                endDate,
            );
        };
        return <Button onClick={(e) => csvExportAction()}>Export CSV</Button>;
    }, [
        onClickExportTokensRequested,
        debouncedSearch,
        sortBy,
        startDate,
        endDate,
    ]);

    useEffect(() => {
        if (exportData != null) {
            setDataForDownload(exportData);
            setDownloadReady(true);
        }
        return onClearExportTokens;
    }, [exportData, setDataForDownload, setDownloadReady, onClearExportTokens]);

    useEffect(() => {
        onLoadTestAuthorities(
            debouncedSearch && debouncedSearch.length >= 3
                ? debouncedSearch
                : null,
        );
    }, [onLoadTestAuthorities, debouncedSearch]);

    useEffect(() => {
        onLoadTokens({
            pageIndex,
            sortBy,
            search:
                debouncedSearch && debouncedSearch.length >= 3
                    ? debouncedSearch
                    : null,
            startDate,
            endDate,
        });
        return onExit;
    }, [
        onLoadTokens,
        onExit,
        pageIndex,
        debouncedSearch,
        sortBy,
        startDate,
        endDate,
    ]);

    return (
        <Paper className={classes.root}>
            <Grid
                container
                spacing={8}
                justify="space-between"
                alignItems="flex-start"
                wrap="nowrap"
            >
                <Grid item>
                    <Typography variant="h3" color="primary" gutterBottom>
                        Reports
                    </Typography>
                </Grid>
                <Grid item container justify="flex-end">
                    {renderExport()}
                </Grid>
            </Grid>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={3}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            {total} Tokens
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs="auto"
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Grid item xs="auto">
                            <Autocomplete
                                disabled={loading || taLoading}
                                loading={taLoading}
                                className={classes.autocomplete}
                                options={taList}
                                renderOption={(option) => {
                                    const buttonProps = {
                                        size: BUTTON_SIZE_SMALL,
                                        style: { fontSize: 12 },
                                    };
                                    switch (option.value) {
                                        case TEST_AUTHORITY_STATUS_ACTIVE:
                                            break;
                                        case TEST_AUTHORITY_STATUS_INACTIVE:
                                            buttonProps.variant = VARIANT_OUTLINED;
                                            break;
                                        default:
                                            return (
                                                <Typography>
                                                    {option.label}
                                                </Typography>
                                            );
                                    }
                                    return (
                                        <Button {...buttonProps}>
                                            {option.label}
                                        </Button>
                                    );
                                }}
                                getOptionLabel={(option) => option.label}
                                getOptionSelected={(option, item) =>
                                    option.value === item.value
                                }
                                popupIcon={AUTOCOMPLETE_POPUP_ICON}
                                closeIcon={AUTOCOMPLETE_CLOSE_ICON}
                                fullWidth
                                onChange={(e, item) =>
                                    setSearch(item ? item.value : null)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        variant="filled"
                                        {...params}
                                        label={LABEL_FOR_FILTER}
                                        value={search}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs="3" className={classes.gridSpacer}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                inputVariant="filled"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="start-date-filter"
                                label="Start Date"
                                value={startDate}
                                onChange={setStartDate}
                                leftArrowButtonProps={{
                                    'aria-label': 'Previous month',
                                }}
                                rightArrowButtonProps={{
                                    'aria-label': 'Next month',
                                }}
                                InputAdornmentProps={{
                                    position: 'start',
                                }}
                                KeyboardButtonProps={{
                                    title: 'Change start date',
                                    'aria-label': 'Change start date',
                                }}
                                inputProps={{
                                    'aria-label':
                                        'Enter a date. Dates should be in the format mm/dd/yyyy',
                                }}
                                keyboardIcon={
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                }
                            />
                        </Grid>
                        <Grid item xs="3" className={classes.gridSpacer}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                inputVariant="filled"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="end-date-filter"
                                label="End Date"
                                value={endDate}
                                onChange={setEndDate}
                                leftArrowButtonProps={{
                                    'aria-label': 'Previous month',
                                }}
                                rightArrowButtonProps={{
                                    'aria-label': 'Next month',
                                }}
                                InputAdornmentProps={{
                                    position: 'start',
                                }}
                                KeyboardButtonProps={{
                                    title: 'Change end date',
                                    'aria-label': 'Change end date',
                                }}
                                inputProps={{
                                    'aria-label':
                                        'Enter a date. Dates should be in the format mm/dd/yyyy',
                                }}
                                keyboardIcon={
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                }
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid container direction="column">
                <Grid item>
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
                            onPageChange={onChangePage}
                            onSort={setSortBy}
                            scopes={TABLE_SCOPES}
                            TableOptions={{
                                data,
                                columns: TA_TOKEN_REPORT_TABLE_COLUMNS,
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
                            aria-label="Report table"
                        />
                    )}
                    {!loading && (!data || !data.length) && (
                        // No data to be shown - let's indicate that to the user.
                        <Typography align="center">
                            No tokens were found. Try clearing your search
                            and/or filter.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
}

const StyledTokenReport = withStyles(styles)(TokenReport);
export default StyledTokenReport;

StyledTokenReport.propTypes = {
    loading: PropTypes.bool,
    pageIndex: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    total: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            [NAME_FOR_TEST_AUTHORITY_NAME_FIELD]: PropTypes.string.isRequired,
            [NAME_FOR_TEST_AUTHORITY_ID_FIELD]: PropTypes.string.isRequired,
            [NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD]: PropTypes.string.isRequired,
            [NAME_FOR_TEST_AUTHORITY_STATUS_FIELD]: PropTypes.string.isRequired,
            [NAME_FOR_TOKEN_REPORT_SUBMITTED_FIELD]:
                PropTypes.string.isRequired,
        }),
    ),
    exportData: PropTypes.string,
    onLoadTestAuthorities: PropTypes.func.isRequired,
    onLoadTokens: PropTypes.func.isRequired,
    onClickExportTokensRequested: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    search: PropTypes.string,
    setSearch: PropTypes.func.isRequired,
    startDate: PropTypes.string,
    setStartDate: PropTypes.func.isRequired,
    endDate: PropTypes.string,
    setEndDate: PropTypes.func.isRequired,
    taList: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            label: PropTypes.string.isRequired,
        }),
    ),
    taLoading: PropTypes.bool,
    onClearExportTokens: PropTypes.func,
    onExit: PropTypes.func.isRequired,
};

StyledTokenReport.defaultProps = {
    loading: false,
    search: null,
    exportTokens: null,
    startDate: null,
    endDate: null,
    taList: [],
    taLoading: false,
    onClearExportTokens: noop,
};

const mapStateToProps = (state) => ({
    loading: isTokenReportLoading(state),
    taListLoading: isTaListLoading(state),
    pageIndex: getPageIndex(state),
    itemsPerPage: getItemsPerPage(state),
    pageCount: getPageCount(state),
    data: getTableData(state),
    exportData: getExportData(state),
    search: getSearch(state),
    taList: getTaList(state),
    startDate: getStartDate(state),
    endDate: getEndDate(state),
    total: getTotal(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLoadTestAuthorities: (search) => dispatch(fetchTaListRequested(search)),
    onLoadTokens: (props) => dispatch(fetchTokensRequested(props)),
    onClickExportTokensRequested: () => dispatch(exportTokensRequested()),
    onClearExportTokens: () => dispatch(clearExportTokens()),
    onChangePage: (pageIndex) =>
        dispatch(storePaginationContext({ pageIndex })),
    setSearch: (search) => dispatch(storePaginationContext({ search })),
    setStartDate: (startDate) =>
        dispatch(storePaginationContext({ startDate, pageIndex: 0 })),
    setEndDate: (endDate) =>
        dispatch(storePaginationContext({ endDate, pageIndex: 0 })),
    onExit: () => dispatch(resetPaginationContext()),
});

export const ConnectedTokenReport = connect(
    mapStateToProps,
    mapDispatchToProps,
)((props) => {
    return (
        <ConnectedMainLayout>
            <StyledTokenReport {...props} />
        </ConnectedMainLayout>
    );
});
