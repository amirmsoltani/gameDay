import Card from './card';
import React from 'react';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';
import Pagination from '@/components/table/pagination/pagination';

export const GridLayout = styled((props: React.ComponentProps<typeof Box>) => (
    <Box
        {...props}
        sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)'
            }
        }}>
        {props.children}
    </Box>
))({});

export default function Cards({ data = [], totalPages = 1, activePage = 1 }) {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);

    return (
        <Container maxWidth="xl">
            <GridLayout>
                {data.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </GridLayout>
            <div style={{ margin: '0 auto' }}>
                <Pagination
                    activePage={activePage}
                    totalPages={totalPages}
                    onPageChange={(pageNumber) =>
                        dispatch(setPageData({ ...pageData, activePage: pageNumber }))
                    }
                />
            </div>
        </Container>
    );
}
