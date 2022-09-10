// import React, { useState } from 'react';
// import {
//     Box,
//     Stack,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography
// } from '@mui/material';
// import { Spacer } from '../base/spacer';

// function createData(applicant, applyDate, ApplicantEmail, ApplicantCV, situation) {
//     return { applicant, applyDate, ApplicantEmail, ApplicantCV, situation };
// }

// const rows = [
//     createData('Bardia Bastami', '20/03/2020', 'sampleemail@gmail.com', 2, 40570),
//     createData('Bardia Bastami', '20/03/2020', 'sampleemail@gmail.com', 0, 180139),
//     createData('Bardia Bastami', '20/03/2020', 'sampleemail@gmail.com', 1, 90989),
//     createData('Bardia Bastami', '20/03/2020', 'sampleemail@gmail.com', 1, 10239)
// ];

// const headCells = [
//     {
//         id: 'applicant',
//         align: 'left',
//         disablePadding: false,
//         label: 'applicant'
//     },
//     {
//         id: 'applyDate',
//         align: 'left',
//         disablePadding: true,
//         label: 'apply Date'
//     },
//     {
//         id: 'ApplicantEmail',
//         align: 'center',
//         disablePadding: true,
//         label: 'Applicant Email'
//     },
//     {
//         id: 'ApplicantCV',
//         align: 'center',
//         disablePadding: true,
//         label: 'Applicant CV'
//     },
//     {
//         id: 'situation',
//         align: 'center',
//         disablePadding: true,
//         label: 'situation'
//     }
// ];

// function OrderTableHead({ order, orderBy }) {
//     return (
//         <TableHead>
//             <TableRow sx={{ backgroundColor: '#EBEBEB' }}>
//                 {headCells.map((headCell) => (
//                     <TableCell
//                         sx={{ margin: '80px' }}
//                         key={headCell.id}
//                         align={headCell.align}
//                         sortDirection={orderBy === headCell.id ? order : false}>
//                         {headCell.label}
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// const OrderStatus = ({ status }) => {
//     let color;
//     let title;

//     switch (status) {
//         case 0:
//             color = 'warning';
//             title = 'Pending';
//             break;
//         case 1:
//             color = 'success';
//             title = 'Approved';
//             break;
//         case 2:
//             color = 'error';
//             title = 'Rejected';
//             break;
//         default:
//             color = 'primary';
//             title = 'None';
//     }

//     return (
//         <Stack direction="row" spacing={1} alignItems="center">
//             <Typography>{title}</Typography>
//         </Stack>
//     );
// };

// export const ApplicantList = () => {
//     const [order] = useState('asc');
//     const [orderBy] = useState('applicant');
//     const [selected] = useState([]);

//     const isSelected = (applicant) => selected.indexOf(applicant) !== -1;

//     return (
//         <Box sx={{ backgroundColor: '#FAFAFA', padding: '30px' }}>
//             <TableContainer
//                 sx={{
//                     backgroundColor: '#FFFFFF',
//                     borderRadius: '20px',
//                     width: '100%',
//                     overflowX: 'auto',
//                     position: 'relative',
//                     display: 'block',
//                     maxWidth: '100%',
//                     '& td, & th': { whiteSpace: 'nowrap' }
//                 }}>
//                 <Table
//                     sx={{
//                         '& .MuiTableCell-root:first-child': {
//                             pl: 2
//                         },
//                         '& .MuiTableCell-root:last-child': {
//                             pr: 3
//                         }
//                     }}>
//                     <OrderTableHead order={order} orderBy={orderBy} />
//                     <TableBody>
//                         {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
//                             const isItemSelected = isSelected(row.applicant);
//                             const labelId = `enhanced-table-checkbox-${index}`;
//                             return (
//                                 <TableRow
//                                     hover
//                                     role="checkbox"
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                     aria-checked={isItemSelected}
//                                     tabIndex={-1}
//                                     key={row.applicant}
//                                     selected={isItemSelected}>
//                                     <TableCell component="th" id={labelId} scope="row" align="left">
//                                         <Typography color="secondary">{row.applicant}</Typography>
//                                     </TableCell>
//                                     <TableCell align="left">{row.applyDate}</TableCell>
//                                     <TableCell align="left">{row.ApplicantEmail}</TableCell>
//                                     <TableCell align="left">
//                                         <OrderStatus status={row.ApplicantCV} />
//                                     </TableCell>
//                                     <TableCell align="left">
//                                         {/* <NumberFormat
//                                             value={row.situation}
//                                             displayType="text"
//                                             thousandSeparator
//                                             prefix="$"
//                                         /> */}
//                                     </TableCell>
//                                 </TableRow>
//                             );
//                         })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };

import React, { FC, Fragment, useState } from 'react';
import CommentIcon from 'src/assets/icons/comment-icon';
import PlayIcon from 'src/assets/icons/play-icon';
import SaveIcon from 'src/assets/icons/save-icon';
import { GetLessonQuery, useInfiniteGetLessonQuery, Lesson } from 'src/graphql/generated';
import { PrimarySpinner } from '../base/loader/spinner';
import { MButton } from '../base/MButton';
import * as S from './jobs-style';

type PropsType = {
    id: number;
};

type ListType = GetLessonQuery['lesson_getLessons']['result']['items'];
const CatalogLearnSection: FC<PropsType> = ({ id }) => {
    const [itemList, setItemList] = useState<ListType>([]);

    const [end, setEnd] = useState(false);

    const { isFetching, isFetchingNextPage, fetchNextPage } = useInfiniteGetLessonQuery(
        { take: 10, skip: 0, where: { skillCategoryId: { eq: id } } },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    setItemList([...pages[0].lesson_getLessons.result.items]);
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].lesson_getLessons.result.items || [])
                    ]);
                }
                if (pages[length - 1].lesson_getLessons.result.pageInfo.hasNextPage === false) {
                    setEnd(true);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    if (isFetching && !isFetchingNextPage)
        return (
            <S.Content display={'flex'} justifyContent="center" alignItems="center">
                <PrimarySpinner />
            </S.Content>
        );

    return (
        <S.CatalogLearn
            onScroll={(event: any) => {
                const { scrollTop, scrollHeight, clientHeight } = event.target;
                if (scrollTop + clientHeight >= scrollHeight * 0.5 && !end && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}>
            <div className="catalog-learn__box-btn">
                <MButton className="box-btn__btn">
                    <CommentIcon />
                </MButton>
                <MButton className="box-btn__btn">
                    <SaveIcon />
                </MButton>
            </div>
            <span className="catalog-learn__description-title">Description</span>
            <p className="catalog-learn__description-text">lorem ipsome</p>
            {itemList.map((lesson, index) => (
                <Fragment key={lesson.title}>
                    <div className="catalog-learn__card-header">
                        <span className="card-header__index">{index + 1}</span>{' '}
                        <span>{lesson.title}</span>
                    </div>
                    {lesson.topics.map((topic) => (
                        <div className="catalog-learn__card-lesson" key={topic.title}>
                            <div className="card-lesson__box-left">
                                <PlayIcon />
                                <span className="box-left__file-name">{topic.fileUrl}</span>
                            </div>
                            <div>
                                <span>5:30</span>
                            </div>
                        </div>
                    ))}
                </Fragment>
            ))}
        </S.CatalogLearn>
    );
};

export default CatalogLearnSection;
