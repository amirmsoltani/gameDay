import SortUpIcon from 'src/assets/table-container/sort.up.icon';
import SortDownIcon from 'src/assets/table-container/sort.down.icon';
import TableSearchIcon from 'src/assets/table-container/table.search.icon';
import { Fragment } from 'react';
import { TableLayoutProps } from './types.table.layout';
import {
    StyledTable,
    StyledTHead,
    StyledTBody,
    StyledSearchTR,
    StyledHeadTR,
    StyledTH,
    StyledBodyTR,
    StyledTD,
    TableRowSpacer,
    TableButtonSearchHead,
    TableSortIconsContainer,
    TableSearchInputContainer,
    TableSearchInputField,
    RotateArrow
} from './styled.table.layout';

export function TableSearchInput({
    LeftIcon = null,
    RightIcon = TableSearchIcon,
    wrapperStyle = {},
    ...props
}) {
    return (
        <TableSearchInputContainer style={wrapperStyle}>
            {LeftIcon && <LeftIcon />}
            <TableSearchInputField {...props} />
            {RightIcon && (
                <RotateArrow>
                    <RightIcon />
                </RotateArrow>
            )}
        </TableSearchInputContainer>
    );
}

export default function TableLayout({
    columns = [],
    rows = [],
    onSearch,
    searchData,
    isError,
    onSort,
    onChange,
    TD = StyledTD,
    TR = StyledBodyTR
}: TableLayoutProps) {
    const hasRowLabel = rows.some((row) => row.label);
    const mustShowLabels = columns.some((column) => column.label);

    return (
        <StyledTable>
            <StyledTHead>
                <StyledSearchTR>
                    {hasRowLabel && <th></th>}
                    {columns.map((column, index) => (
                        <StyledTH key={index} data-hidden={column.search ? 'false' : 'true'}>
                            {column.search && (
                                <TableSearchInput
                                    name="tableinputsearch"
                                    style={{ width: '110px', fontSize: '12px' }}
                                    placeholder={column.search}
                                    title={column.search}
                                    value={searchData?.[column.id] || ''}
                                    onChange={(e) => onSearch?.({ column, value: e.target.value })}
                                />
                            )}
                            {column.button && (
                                <TableButtonSearchHead
                                    variant="contained"
                                    degree2="red"
                                    {...column.button}>
                                    {column.button.label}
                                </TableButtonSearchHead>
                            )}
                        </StyledTH>
                    ))}
                </StyledSearchTR>
                <StyledHeadTR>
                    {hasRowLabel && <th></th>}
                    {mustShowLabels &&
                        columns.map((column, index) => (
                            <StyledTH key={index}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <div>{column.label}</div>
                                    {column.sort && (
                                        <TableSortIconsContainer>
                                            <SortUpIcon
                                                onClick={() =>
                                                    onSort?.({ column, direction: 'ASC' })
                                                }
                                            />
                                            <SortDownIcon
                                                onClick={() =>
                                                    onSort?.({ column, direction: 'DESC' })
                                                }
                                            />
                                        </TableSortIconsContainer>
                                    )}
                                </div>
                            </StyledTH>
                        ))}
                </StyledHeadTR>
            </StyledTHead>
            <StyledTBody>
                {rows.length === 0 || isError ? (
                    <StyledBodyTR>
                        <TD colSpan={columns.length} style={{ textAlign: 'center' }}>
                            No Data
                        </TD>
                    </StyledBodyTR>
                ) : (
                    rows.map((row, rowIndex) => {
                        return (
                            <Fragment key={rowIndex}>
                                <StyledBodyTR>
                                    {hasRowLabel && (
                                        <th style={{ fontWeight: 'normal' }}>{row.label}</th>
                                    )}
                                    {columns.map((column, columnIndex) => (
                                        <TD
                                        column={column}
                                            data-label={column.label ? column.label + ':' : ''}
                                            key={columnIndex}
                                            row={rows[rowIndex]}>
                                            {getCell(column, row, rowIndex)}
                                        </TD>
                                    ))}
                                </StyledBodyTR>
                                <TableRowSpacer />
                            </Fragment>
                        );
                    })
                )}
            </StyledTBody>
        </StyledTable>
    );

    function getCell(column, row, rowIndex) {
        const { Component, ...rest } = column;
        const { value, ...props } =
            row?.[column.id]?.constructor === Object ? row[column.id] : { value: row?.[column.id] };

        return Component ? (
            <Component
                row={row}
                value={value}
                onChange={(value) => {
                    rows[rowIndex][column.id] = value;

                    onChange?.([...rows]);
                }}
                {...rest}
                {...(props || {})}
            />
        ) : (
            row[column.id]
        );
    }
}
