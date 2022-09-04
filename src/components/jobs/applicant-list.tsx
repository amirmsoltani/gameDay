import React, { useState } from 'react';
import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { Spacer } from '../base/spacer';

function createData(applicant, applyDate, ApplicantEmail, ApplicantCV, situation) {
    return { applicant, applyDate, ApplicantEmail, ApplicantCV, situation };
}

const rows = [
    createData('Bardia Bastami', '20/03/2020', 'sampleemail@gmail.com', 2, 40570),
    createData('Bardia Bastami', '20/03/2020', 'sampleemail@gmail.com', 0, 180139),
    createData('Bardia Bastami', '20/03/2020', 'sampleemail@gmail.com', 1, 90989),
    createData('Bardia Bastami', '20/03/2020', 'sampleemail@gmail.com', 1, 10239)
];

const headCells = [
    {
        id: 'applicant',
        align: 'left',
        disablePadding: false,
        label: 'applicant'
    },
    {
        id: 'applyDate',
        align: 'left',
        disablePadding: true,
        label: 'apply Date'
    },
    {
        id: 'ApplicantEmail',
        align: 'center',
        disablePadding: true,
        label: 'Applicant Email'
    },
    {
        id: 'ApplicantCV',
        align: 'center',
        disablePadding: true,
        label: 'Applicant CV'
    },
    {
        id: 'situation',
        align: 'center',
        disablePadding: true,
        label: 'situation'
    }
];

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow sx={{ backgroundColor: '#EBEBEB' }}>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ margin: '80px' }}
                        key={headCell.id}
                        align={headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography>{title}</Typography>
        </Stack>
    );
};

export const ApplicantList = () => {
    const [order] = useState('asc');
    const [orderBy] = useState('applicant');
    const [selected] = useState([]);

    const isSelected = (applicant) => selected.indexOf(applicant) !== -1;

    return (
        <Box sx={{ backgroundColor: '#FAFAFA', padding: '30px' }}>
            <TableContainer
                sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}>
                <Table
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}>
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.applicant);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.applicant}
                                    selected={isItemSelected}>
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Typography color="secondary">{row.applicant}</Typography>
                                    </TableCell>
                                    <TableCell align="left">{row.applyDate}</TableCell>
                                    <TableCell align="left">{row.ApplicantEmail}</TableCell>
                                    <TableCell align="left">
                                        <OrderStatus status={row.ApplicantCV} />
                                    </TableCell>
                                    <TableCell align="left">
                                        {/* <NumberFormat
                                            value={row.situation}
                                            displayType="text"
                                            thousandSeparator
                                            prefix="$"
                                        /> */}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
