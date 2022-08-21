import React from 'react';
import { StyledTD } from 'src/components/table/table_layout/styled.table.layout';
import { useRedirectToPage } from 'src/routes';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const CustomTD = ({ children, row, column,...rest }) => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return row === undefined ? (
        <StyledTD colSpan={isMd ? 3 : 8} style={{ textAlign: 'center' }}>
            <Typography component="span" sx={{ textAlign: 'center' }}>
                No Data
            </Typography>
        </StyledTD>
    ) : (
        <StyledTD
            style={{ cursor: 'pointer' }}
            // onClick={() => {
            //     column?.id === 'options' || column?.id === 'asigntoproject' || column?.id === 'website' || column?.id === 'tiktokiD' ? null : redirectToAcceptPage(row?.id, row?.originalId);
            // }}
            {...rest}
            >
            {children}
        </StyledTD>
    );
};
