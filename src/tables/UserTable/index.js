/* eslint-disable react/jsx-key */
/*
 * We are disabling the eslint rule that checks for a key is included in components rendered via an arrow function.
 * Because we are spreading the props returned from calls to react-table that include a key, and we always expect it to be present.
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useSortBy } from 'react-table';
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, UnfoldMore } from '@material-ui/icons';
import styles from './styles';
import { noop } from '../../common/utils';
import Pagination from '../Pagination';

const UserTable = ({
    TableOptions,
    initialState,
    classes,
    renderActionCell,
    onPageChange,
    onSort,
    scopes,
    ...props
}) => {
    const tableInstance = useTable(
        {
            ...TableOptions,
            initialState,
        },
        useSortBy,
        usePagination,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        pageCount,
        state: { pageIndex, sortBy },
    } = tableInstance;

    useEffect(() => {
        onSort(sortBy);
    }, [onSort, sortBy]);

    const renderTablePagination = () => {
        return (
            pageCount > 0 && (
                <Grid
                    container
                    justify="flex-end"
                    className={classes.pagination}
                >
                    <Pagination
                        count={pageCount}
                        page={pageIndex + 1}
                        onChange={(event, page) => {
                            onPageChange
                                ? onPageChange(page - 1)
                                : gotoPage(page - 1);
                        }}
                    />
                </Grid>
            )
        );
    };

    return (
        <>
            <TableContainer className={classes.container}>
                <Table {...getTableProps()} {...props}>
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <TableCell
                                        className={classes.headCell}
                                        scope="col"
                                        tabIndex={
                                            column.sortable === false
                                                ? '-1'
                                                : '0'
                                        }
                                        onKeyPress={(event) => {
                                            if (
                                                column.sortable !== false &&
                                                (event.key === 'Enter' ||
                                                    event.key === ' ')
                                            )
                                                column.toggleSortBy();
                                        }}
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps(),
                                        )}
                                    >
                                        {column.render('Header')}
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <ArrowDropDown
                                                    className={classes.sortIcon}
                                                    aria-hidden="false"
                                                    aria-label="Sort Ascending"
                                                />
                                            ) : (
                                                <ArrowDropUp
                                                    className={classes.sortIcon}
                                                    aria-hidden="false"
                                                    aria-label="Sort Descending"
                                                />
                                            )
                                        ) : (
                                            <UnfoldMore
                                                className={classes.sortIcon}
                                                aria-hidden="false"
                                                aria-label="Sort Column"
                                            />
                                        )}
                                    </TableCell>
                                ))}
                                {renderActionCell && (
                                    <TableCell
                                        className={classes.headCell}
                                        title="Action"
                                        role="columnheader"
                                    >
                                        Actions
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell
                                                className={classes.rowCell}
                                                scope={
                                                    scopes[
                                                        cell.column.Header
                                                    ] || null
                                                }
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render('Cell')}
                                            </TableCell>
                                        );
                                    })}
                                    {renderActionCell && (
                                        <TableCell
                                            className={classes.actionCell}
                                            role="cell"
                                        >
                                            {renderActionCell(
                                                row && row.values,
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {renderTablePagination()}
        </>
    );
};

UserTable.propTypes = {
    // From withStyles we expect to get classes
    classes: PropTypes.object.isRequired,

    // Props for use with react-table implementation
    TableOptions: PropTypes.object, // See https://react-table.tanstack.com/docs/api/useTable
    initialState: PropTypes.object, // See https://react-table.tanstack.com/docs/api/usePagination

    // For a custom cell - intended for Action buttons
    renderActionCell: PropTypes.func,

    // Function to be called when the page changes
    onPageChange: PropTypes.func,

    // Function to call when the sortBy changes
    onSort: PropTypes.func,

    // Holds scope information for table cells' scope attribute based on that cell's parent heading
    scopes: PropTypes.object,
};

UserTable.defaultProps = {
    TableOptions: {},
    initialState: {
        pageSize: 8,
        pageIndex: 0,
        manualPagination: true,
        pageCount: 2,
    },
    renderActionCell: null,
    onPageChange: null,
    onSort: noop,
    scopes: {},
};

export default withStyles(styles)(UserTable);
