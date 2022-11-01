import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { ArrowDownBoldIcon, ArrowDownIcon } from 'src/assets/common/ArrowDownIcon';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import {
    useInfiniteGetCatalogSkillQuery,
    GetCatalogSkillQuery,
    SortEnumType,
    SkillSortInput
} from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { NumberInput } from '../base/input/number-input';
import { PrimarySpinner } from '../base/loader/spinner';
import Sort from '../sort';
import * as S from './catalog-style';

type PropsType = {
    id: number;
};

type ListType = GetCatalogSkillQuery['skill_getSkills']['result']['items'];
const CatalogSkillSection: FC<PropsType> = ({ id }) => {
    const [sort, setSort] = useState<Omit<SkillSortInput, 'skillCategory'>>({
        title: SortEnumType.Asc
    });
    const sorting = (name: keyof SkillSortInput) => () => {
        if (sort[name] === SortEnumType.Asc) {
            setSort({ [name]: SortEnumType.Desc });
        } else {
            setSort({ [name]: SortEnumType.Asc });
        }
    };

    const [itemList, setItemList] = useState<ListType>([]);
    const router = useRouter();

    const [end, setEnd] = useState(false);

    const { isFetching, isFetchingNextPage, fetchNextPage } = useInfiniteGetCatalogSkillQuery(
        {
            take: 10,
            skip: 0,
            where: { skillCategoryId: { eq: id } },
            order: sort
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    setItemList([...pages[0].skill_getSkills.result.items]);
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].skill_getSkills.result.items || [])
                    ]);
                }
                if (pages[length - 1].skill_getSkills.result.pageInfo.hasNextPage === false) {
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
        <S.CatalogSkills>
            <div className="catalog-skill__header">
                <span>skill percentage for getting reward</span>
                <NumberInput min={0} max={100} sign="%" defaultValue={60} />
            </div>

            <Grid container className="catalog-skill__list-header">
                <Grid md={1} xs={1} item />
                <Grid
                    md={4}
                    xs={4}
                    item
                    onClick={sorting('title')}
                    display="flex"
                    alignItems="center">
                    Skill Title
                    <Sort name="title" sortObject={sort} />
                </Grid>
                <Grid md={3.5} xs={3.5} item className="list-header__center" onClick={sorting('')}>
                    Catalog of skills
                </Grid>
                <Grid md={3.5} xs={3.5} item className="list-header__center">
                    Number of questions
                </Grid>
            </Grid>
            <div
                className="catalog-skill__list-body"
                onScroll={(event: any) => {
                    const { scrollTop, scrollHeight, clientHeight } = event.target;
                    if (
                        scrollTop + clientHeight >= scrollHeight * 0.5 &&
                        !end &&
                        !isFetchingNextPage
                    ) {
                        fetchNextPage();
                    }
                }}>
                {itemList.map((skill, index) => (
                    <Grid
                        container
                        className="catalog-skill__card-body"
                        key={skill.id}
                        onClick={() => {
                            router.push(`/catalog/${skill.id}/skill`);
                        }}>
                        <Grid md={1} xs={1} className="card-body__item card-body__index" item>
                            {index + 1}
                        </Grid>
                        <Grid md={4} xs={4} className="card-body__item card-body__title" item>
                            <MImage
                                className="title__icon"
                                resources={{
                                    src: skill.iconUrl,
                                    fallback: '/images/user.jpg'
                                }}
                            />
                            <div className="title__text-box">
                                <span>{skill.title}</span>
                                <span>{skill.skillCategory.title}</span>
                            </div>
                        </Grid>
                        <Grid md={3.5} xs={3.5} className="card-body__item" item>
                            {skill.skillCategory.title}
                        </Grid>
                        <Grid md={3.5} xs={3.5} className="card-body__item" item>
                            {skill.skillQuestions.length}
                        </Grid>
                    </Grid>
                ))}
            </div>
        </S.CatalogSkills>
    );
};

export default CatalogSkillSection;
