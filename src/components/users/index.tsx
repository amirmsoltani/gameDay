import LayoutHeader from '@/layout/app-layout/layout-header';
import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import * as S from './users-style';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import { GetUsersQuery, useGetUsersQuery } from 'src/graphql/generated';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import Link from 'next/link';
import { UserList } from './user-list';
import { PrimarySpinner } from '../base/loader/spinner';

function UsersPage() {
    const [itemList, setItemList] = useState<GetUsersQuery['user_getUsers']['result']['items']>([]);
    const totalItems = useRef<number | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);
    const [end, setEnd] = useState(false);
    const [state, setState] = useState<{ activeCategory?: number } | null>(null);

    const { isLoading, isFetchingNextPage, fetchNextPage } = useGetUsersQuery(
        { take: 5, skip: 0, where: { title: { contains: finalSearchText } } },

        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    setItemList([...pages[0].job_getJobs.result.items]);
                    setState({
                        activeCategory: pages[0].job_getJobs.result.items[0]?.id
                    });
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].job_getJobs.result.items || [])
                    ]);
                }
                if (pages[length - 1].job_getJobs.result.pageInfo.hasNextPage === false) {
                    setEnd(true);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    if (isLoading)
        return (
            <S.Content display={'flex'} justifyContent="center" alignItems="center">
                <PrimarySpinner />
            </S.Content>
        );

    return (
        <S.Content>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">User List</div>
                    <span>{totalItems.current} items Listed</span>
                    <SearchInput
                        onChange={(event: any) => {
                            setSearchText(event.target.value);
                        }}
                        wrapperClassName="header__search-input"
                    />
                </S.Header>
            </LayoutHeader>

            <S.ListWrapper display={'grid'} gridTemplateRows="repeat(12, 1fr)">
                <S.ListHeader container gridRow={'span 1'}>
                    <Grid lg={0.5} xs={12} item />
                    <Grid lg={2.5} xs={12} className={'list-header__item no-center'} item>
                        Sort by
                    </Grid>
                    <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                        User Email
                    </Grid>
                    <Grid lg={3} xs={12} className={'list-header__item'} item>
                        User Phone number
                    </Grid>
                    <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                        situation
                    </Grid>
                    <Grid lg={0.5} xs={12} className={'list-header__item'} item></Grid>
                </S.ListHeader>
                <S.ListBody gridRow={'span 11'}>
                    {itemList.map((item) => (
                        <UserList
                            key={item.title}
                            data={{
                                firstName: item.firstName,
                                lastName: item.lastName,
                                pictureUrl: item.pictureUrl,
                                phoneNumber: item.phoneNumber,
                                email: item.email,
                                activeStatus: item.activeStatus
                            }}
                        />
                    ))}
                </S.ListBody>
            </S.ListWrapper>
        </S.Content>
    );
}

export default UsersPage;
