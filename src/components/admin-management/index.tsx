import LayoutHeader from '@/layout/app-layout/layout-header';
import { GetUsersQuery } from 'src/graphql/generated';
import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import * as S from './admin-style';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import Link from 'next/link';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import AdminManagementList from './admin-list';

function AdminManagement() {
    const [itemList, setItemList] = useState<GetUsersQuery['user_getUsers']['result']['items']>([]);
    const totalItems = useRef<number | null>(null);

    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);

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
                        ccess
                    </Grid>
                    <Grid lg={0.5} xs={12} className={'list-header__item'} item></Grid>
                </S.ListHeader>
                <S.ListBody gridRow={'span 11'}>
                    <AdminManagementList />
                </S.ListBody>
            </S.ListWrapper>
        </S.Content>
    );
}

export default AdminManagement;
