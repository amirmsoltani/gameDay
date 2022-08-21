import { MInputFormik } from '@/components/base/input/MInput';
import { Grid } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIconExercise } from 'src/assets/exercise/search-icon';
import { setPageData } from 'src/redux/actions/actions';
import * as S from '../exercise.styled';

interface IInitialFormikProps {
    search: string;
}
export const ProductsTopActions = () => {
    const pageData = useSelector(({ pageDataShop: pageData }: any) => pageData);

    const dispatch = useDispatch();
    const handleSubmit = (values: IInitialFormikProps) => {
        dispatch(
            setPageData({
                pageData: {
                    ...pageData,
                    searchdata: values.search
                },
                type: 'pageDataShop'
            })
        );
    };
    return (
        <Formik
            initialValues={{
                search: pageData.searchdata
            }}
            onSubmit={handleSubmit}>
            <S.WrapperActionTopExercise>
                <Grid container flex={1} item columnSpacing={6}>
                    <Grid md={8} xs={7} item>
                        <MInputFormik
                            name="search"
                            placeholder="Search product"
                            fullWidth
                            iconComponent={<SearchIconExercise />}
                        />
                    </Grid>
                    <Grid md={4} xs={5} item>
                        <S.SearchButton>Search</S.SearchButton>
                    </Grid>
                </Grid>
            </S.WrapperActionTopExercise>
        </Formik>
    );
};
