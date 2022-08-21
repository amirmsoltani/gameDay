import { Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { ArrowRightSvgIcon } from 'src/assets/icons/arrow-right';
import { Category_GetCategoriesQuery } from 'src/graphql/generated';
import * as S from './snackbar.styled';

type Props = {
    rtl?: boolean;
    categories: Category_GetCategoriesQuery['category_getCategories']['result']['items'];
};

export const SideBarCategory: React.FC<Props> = ({ rtl = false, categories }) => {
    const router = useRouter();

    const { category } = router.query;
    const { sub_category } = router.query;
    const activeCat = useMemo(() => {
        return category && typeof category === 'string'
            ? categories.findIndex(
                  (cat) => cat.name.toLocaleLowerCase().indexOf(decodeURI(category)) >= 0
              )
            : null;
    }, [category]);
    const activeSub = useMemo(() => {
        return sub_category && typeof sub_category === 'string' && activeCat >= 0
            ? categories[activeCat].subCategories.findIndex(
                  (sub) => sub.name.toLocaleLowerCase().indexOf(encodeURI(sub_category)) >= 0
              )
            : null;
    }, [sub_category, activeCat]);
    return (
        <S.WrappderMenu rtl={rtl.toString()}>
            {categories.map((category, index) => (
                <Box key={category.id}>
                    <Link
                        href={{
                            query: {
                                category: encodeURI(category.name.toLocaleLowerCase())
                            }
                        }}>
                        <S.CategoryMenu active={(activeCat === index).toString()}>
                            {category.name}
                            <S.SvgIconMenu active={(activeCat === index).toString()}>
                                <ArrowRightSvgIcon />
                            </S.SvgIconMenu>
                        </S.CategoryMenu>
                    </Link>
                    {activeCat === index && (
                        <Box>
                            {category.subCategories?.map((sub, key) => (
                                <Link
                                    key={sub.id}
                                    href={{
                                        query: {
                                            category: encodeURI(category.name.toLocaleLowerCase()),
                                            sub_category: encodeURI(sub.name.toLocaleLowerCase())
                                        }
                                    }}>
                                    <S.SubCategoryMenu active={(key === activeSub).toString()}>
                                        {sub.name}
                                    </S.SubCategoryMenu>
                                </Link>
                            ))}
                        </Box>
                    )}
                </Box>
            ))}
        </S.WrappderMenu>
    );
};
