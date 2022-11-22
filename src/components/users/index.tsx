import LayoutHeader from '@/layout/app-layout/layout-header';
import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import * as S from './users-style';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import {
    GetAllUsersQuery,
    SortEnumType,
    useGetCurrentUserQuery,
    useInfiniteGetAllUsersQuery,
    UserSortInput
} from 'src/graphql/generated';
import { UserList } from './user-list';
import Loading from '../loading';
import Sort from '../sort';
import keyGenerator from '@/utils/key-generator';

function UsersPage() {
    const [sort, setSort] = useState<UserSortInput>({
        firstName: SortEnumType.Asc,
        lastName: SortEnumType.Asc
    });
    const sorting =
        (name: keyof UserSortInput | { [key: string]: object | SortEnumType }) => () => {
            if (typeof name === 'object') {
                setSort(name);
                return;
            }
            if (sort[name] === SortEnumType.Asc) {
                setSort({ [name]: SortEnumType.Desc });
            } else {
                setSort({ [name]: SortEnumType.Asc });
            }
        };
    const [itemList, setItemList] = useState<GetAllUsersQuery['user_getUsers']['result']['items']>(
        []
    );
    const totalItems = useRef<number | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);
    const [end, setEnd] = useState(false);

    const { isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteGetAllUsersQuery(
        { take: 20, skip: 0, where: { email: { contains: finalSearchText } }, order: sort },

        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    totalItems.current = pages[0].user_getUsers!.result!.totalCount;
                    setItemList(keyGenerator([...pages[0].user_getUsers.result.items]));
                } else {
                    setItemList(
                        keyGenerator([
                            ...itemList,
                            ...(pages[length - 1].user_getUsers.result.items || [])
                        ])
                    );
                }
                if (pages[length - 1].user_getUsers.result.pageInfo.hasNextPage === false) {
                    setEnd(true);
                } else if (end) {
                    setEnd(false);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    const self = useGetCurrentUserQuery(undefined, {
        enabled: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        keepPreviousData: true
    });

    if (isLoading) return <Loading />;

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
                    <Grid
                        lg={2.5}
                        xs={12}
                        className={'list-header__item no-center'}
                        item
                        onClick={sorting(
                            sort.firstName === SortEnumType.Asc
                                ? { firstName: SortEnumType.Desc, lastName: SortEnumType.Desc }
                                : { firstName: SortEnumType.Asc, lastName: SortEnumType.Asc }
                        )}>
                        User Name
                        <Sort name="firstName" sortObject={sort} />
                    </Grid>
                    <Grid
                        lg={2.5}
                        xs={12}
                        className={'list-header__item'}
                        item
                        onClick={sorting('email')}>
                        User Email
                        <Sort name="email" sortObject={sort} />
                    </Grid>
                    <Grid
                        lg={3}
                        xs={12}
                        className={'list-header__item'}
                        item
                        onClick={sorting('phoneNumber')}>
                        User Phone number
                        <Sort name="phoneNumber" sortObject={sort} />
                    </Grid>
                    <Grid
                        lg={2.5}
                        xs={12}
                        className={'list-header__item'}
                        item
                        onClick={sorting('activeStatus')}>
                        situation
                        <Sort name="activeStatus" sortObject={sort} />
                    </Grid>
                    <Grid lg={0.5} xs={12} className={'list-header__item'} item></Grid>
                </S.ListHeader>
                <S.ListBody
                    gridRow={'span 11'}
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
                    {itemList.map((item, index) => (
                        <UserList
                            self={self.data?.user_login.result.id === item.id}
                            key={index}
                            onChange={(status) => {
                                const newItemList = [...itemList];
                                newItemList[index] = {
                                    ...newItemList[index],
                                    activeStatus: status
                                };
                                setItemList(newItemList);
                            }}
                            data={{
                                firstName: item.firstName,
                                lastName: item.lastName,
                                pictureUrl: item.pictureUrl,
                                phoneNumber: item.phoneNumber,
                                email: item.email,
                                activeStatus: item.activeStatus,
                                id: item.id
                            }}
                        />
                    ))}
                </S.ListBody>
            </S.ListWrapper>
        </S.Content>
    );
}

export default UsersPage;
