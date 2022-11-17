import LayoutHeader from '@/layout/app-layout/layout-header';
import {
    ActiveStatus,
    GetAllUsersQuery,
    SortEnumType,
    useInfiniteGetAllUsersQuery,
    User,
    UserSortInput,
    UserType
} from 'src/graphql/generated';
import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import * as S from './admin-style';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import Link from 'next/link';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import AdminManagementList from './admin-list';
import Loading from '../loading';
import Sort from '../sort';

function AdminManagement() {
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
        {
            take: 20,
            skip: 0,
            where: {
                userType: { in: [UserType.Admin, UserType.Admin2Level] },
                email: { contains: finalSearchText }
            },
            order: sort
        },

        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    totalItems.current = pages[0].user_getUsers!.result!.totalCount;
                    setItemList([...pages[0].user_getUsers.result.items]);
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].user_getUsers.result.items || [])
                    ]);
                }
                if (pages[length - 1].user_getUsers.result.pageInfo.hasNextPage === false) {
                    setEnd(true);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    if (isLoading) return <Loading />;
    return (
        <S.Content>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">Admin Management</div>
                    <span>{totalItems.current} items Listed</span>
                    <SearchInput
                        onChange={(event: any) => {
                            setSearchText(event.target.value);
                        }}
                        wrapperClassName="header__search-input"
                    />
                    <Link href="/admin-management/add-admin">
                        <a className="header__link-button">
                            <PlusIcon className="link-button__plus" /> Add admin
                        </a>
                    </Link>
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
                    <Grid lg={2.5} xs={12} className={'list-header__item'} item>
                        access
                    </Grid>
                    <Grid lg={0.5} xs={12} className={'list-header__item'} item></Grid>
                </S.ListHeader>
                <S.ListBody gridRow={'span 11'}>
                    {itemList.map((user, index) => (
                        <AdminManagementList
                            key={user.id}
                            data={user as Partial<User>}
                            onSuspended={(status: ActiveStatus) => {
                                const newItemList = [...itemList];
                                newItemList[index] = {
                                    ...newItemList[index],
                                    activeStatus: status
                                };
                                setItemList(newItemList);
                            }}
                        />
                    ))}
                </S.ListBody>
            </S.ListWrapper>
        </S.Content>
    );
}

export default AdminManagement;
