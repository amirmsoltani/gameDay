import React, { useMemo } from 'react';
import { CategorySvgIcon } from 'src/assets/category/category_svg';
import { Categories } from 'src/graphql/generated';
import * as S from './category.styled';

type Props = {
    categories: Categories[];
};

export const CategoryFirstPage = ({ categories }: Props) => {
    const oddCat = useMemo(() => {
        return categories.filter((_, index) => index % 2);
    }, [categories]);
    const evenCat = useMemo(() => {
        return categories.filter((_, index) => !(index % 2));
    }, [categories]);

    const getSizes = (index) => {
        const m = index % 3;
        if (m < 1) {
            return 80;
        } else if (m < 2) {
            return 70;
        } else {
            return 60;
        }
    };

    return (
        <S.WrapperCategory>
            <CategorySvgIcon />
            <S.CategoryList justifyContent="space-between" container>
                <S.CategoryRow item dir="ltr">
                    {evenCat.map((item, index) => (
                        <S.CategoryItem
                            subCategories={item.subCategories}
                            key={index}
                            name={item.name}
                            size={getSizes(index).toString()}
                            dir="ltr">
                            {item.name}
                        </S.CategoryItem>
                    ))}
                </S.CategoryRow>
                <S.CategoryRow item dir="rtl">
                    {oddCat.map((item, index) => (
                        <S.CategoryItem
                            subCategories={item.subCategories}
                            key={index}
                            name={item.name}
                            size={getSizes(index).toString()}
                            dir="rtl">
                            {item.name}
                        </S.CategoryItem>
                    ))}
                </S.CategoryRow>
            </S.CategoryList>
        </S.WrapperCategory>
    );
};
