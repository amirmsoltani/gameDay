import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { ProductList } from '../product-list';
import Pagination from '@/components/table/pagination/pagination';
import { addStoreCard, setPageData } from 'src/redux/actions/actions';
import { QuickListProducts } from './../quick-list-product';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Category_GetCategoriesQuery, GetAllProductsQuery } from 'src/graphql/generated';
import { WrapperContainer } from '@/components/home/home.styled';
import { SideBarCategory } from '@/components/base/sidebar';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ProductsTopActions } from '../products-action';

type Props = {
    categories: Category_GetCategoriesQuery['category_getCategories']['result']['items'];
    products: GetAllProductsQuery['product_getProducts'];
};

export const ProductFirstPage = ({ categories, products }: Props) => {
    const dispatch = useDispatch();

    const pageData = useSelector(({ pageDataShop: pageData }: any) => pageData);

    const totalPages = useMemo(() => {
        const productsResult = products?.result;
        let len = productsResult.totalCount % 9;
        let total = 1;
        if (len > 0) {
            total = (productsResult.totalCount - len) / 9 + 1;
        } else {
            total = productsResult.totalCount / 9;
        }
        return total;
    }, [products]);

    const router = useRouter();
    const isHomePage = useMemo(() => {
        return !router.query.category;
    }, [router.query]);

    const onDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;
        if (destination === null) {
            return;
        }
        const dragID = +draggableId.replace('product-drag-', '');

        const draggedItem = products.result.items.find((item) => item.id === dragID);

        if (draggedItem) {
            dispatch(addStoreCard(draggedItem));
        }
    };

    return (
        <WrapperContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container columnSpacing={5}>
                    <Grid item xs={8}>
                        <Grid container columnSpacing={5}>
                            <Grid item xs={3}>
                                <SideBarCategory categories={categories} rtl={false} />
                            </Grid>
                            <Grid item xs={9}>
                                <ProductsTopActions />
                                <ProductList lists={products?.result?.items} />
                                <Box sx={{ margin: '10px auto' }}>
                                    <Pagination
                                        activePage={pageData.activePage}
                                        totalPages={totalPages}
                                        onPageChange={(pageNumber) =>
                                            dispatch(
                                                setPageData({
                                                    pageData: {
                                                        ...pageData,
                                                        activePage: pageNumber
                                                    },
                                                    type: 'pageDataShop'
                                                })
                                            )
                                        }
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} paddingTop={12}>
                        <QuickListProducts />
                    </Grid>
                </Grid>
            </DragDropContext>
        </WrapperContainer>
    );
};
