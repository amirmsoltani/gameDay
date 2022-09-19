import LayoutHeader from '@/layout/app-layout/layout-header';
import { Grid } from '@mui/material';
import React from 'react';
import * as S from './users-style';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import { UserList } from './user-list';

function UsersPage() {
    return (
        <S.Content>
            <LayoutHeader>
                <S.Header>
                    <div className="header__info-box">User List</div>
                    <span>items Listed</span>
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
                    <UserList></UserList>
                </S.ListBody>
            </S.ListWrapper>
        </S.Content>
    );
}

export default UsersPage;
