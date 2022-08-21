import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { CircularProgress, styled, Typography } from '@mui/material';
import ImageTable from './image-table';
import { CenterLoading } from '@/components/healers/profile/styled.profile';
import AcceptRejectBooking from './accept-reject-booking';


const CustomTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 'none',
    padding: '20px 0',
    minWidth: '3vw',
    [theme.breakpoints.down('sm')]: {
        minWidth: '22vw',
    }
}))

function createData(clientName, serviceType, sessionname, phone, idClient, imageUser) {
    return { clientName, serviceType, sessionname, phone, idClient, imageUser };
}


export default function BasicTable({items,loadingBookings}) {
    const rows = items?.map((item, index) => (createData(item?.visitor?.name, item?.session?.healingType?.title, item?.session?.title, item?.visitor?.phoneNumber, item?.id, item?.visitor?.imageAddress)))
    return (
        loadingBookings ? <CenterLoading><CircularProgress /></CenterLoading> :
            <TableContainer>
                <Table sx={{ boxShadow: 'none' }}>
                    {rows?.length > 0 ?
                        <TableBody>
                            {rows?.map((row, index) => (
                                <TableRow key={index}>
                                    <CustomTableCell align="left"><ImageTable value={row?.imageUser} /></CustomTableCell>
                                    <CustomTableCell align="left">{row?.clientName}</CustomTableCell>
                                    <CustomTableCell align="left">{`${(row?.serviceType)?.substring(0,15)}${row?.serviceType?.length >15 ? '...' :''}`}</CustomTableCell>
                                    <CustomTableCell align="left">{row?.sessionname}</CustomTableCell>
                                    <CustomTableCell align="left">{row?.phone}</CustomTableCell>
                                    <CustomTableCell align="left"><AcceptRejectBooking id={row?.idClient} /></CustomTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        :
                        <CenterLoading style={{ marginTop: '30px' }}><Typography>No Data</Typography></CenterLoading>
                    }
                </Table>
            </TableContainer>
    );
}
