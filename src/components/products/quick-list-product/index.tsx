import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { IQuickListStoreCard } from 'src/redux/reducer/reducer';
import { ListQuickProductsWrapper } from './list-quick-product';

export const QuickListProducts = () => {
    const products = useSelector(({ storeCard }: IQuickListStoreCard) => storeCard);

    const onSubmit = () => {};

    const initialValues = {
        products: products.map(() => ({
            reps: '',
            hold: '',
            perform: '',
            set: '',
            note: '',
            holdType: '',
            performType: ''
        }))
    };

    return (
        <Box>
            <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
                <Form>
                    <ListQuickProductsWrapper storeCard={products} />
                </Form>
            </Formik>
        </Box>
    );
};
