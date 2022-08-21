import React, { useEffect } from 'react';
import { newModal } from 'src/redux/actions/actions';
import { useDispatch } from 'react-redux';
import * as S from './home.styled';
import { Categories } from 'src/graphql/generated';
import { CategoryFirstPage } from './category/category_firstpage';

import { ModalFirstTime } from './modals';

type Props = {
    categories: Categories[];
    isFirstTime: boolean;
};

const Home = ({ categories, isFirstTime }: Props) => {
    const dispatch = useDispatch();
    // const { data } = useGetCategoryQuery();

    // console.log('Data: ', data);

    useEffect(() => {
        if (isFirstTime === false) {
            if (!sessionStorage.getItem('accepted-terms')) {
                dispatch(
                    newModal({
                        id: 'ModalLoadFirstTime',
                        Body: ModalFirstTime,
                        closeButton: false,
                        canClose: false,
                        top: 0
                    })
                );
            }
        }
    }, [isFirstTime]);

    return (
        <>
            <S.WrapperContainer container>
                <CategoryFirstPage categories={categories} />
            </S.WrapperContainer>
        </>
    );
};

export default Home;
