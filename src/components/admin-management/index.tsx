import LayoutHeader from '@/layout/app-layout/layout-header';
import { GetUsersQuery } from 'src/graphql/generated';
import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import * as S from './admin-style';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import AdminManagement from './admin-list';

function UsersPage() {
    const [itemList, setItemList] = useState<GetUsersQuery['user_getUsers']['result']['items']>([]);
    const totalItems = useRef<number | null>(null);

    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);

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
                        <AdminManagement
                            key={item.firstName}
                            data={{
                                pictureUrl: item.pictureUrl,
                                firstName: item.firstName,
                                lastName: item.lastName,
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
