import { Grid } from '@mui/material';
import React from 'react';
import CatalogCard from './catalog-card';
import * as S from './catalog-style';

function CatalogPage() {
    return (
        <S.Content container>
            <S.LeftSide item container xl={4.5}>
                <Grid item lg={11} className="left-side__cards">
                    <CatalogCard
                        onChangeTab={() => {}}
                        data={{
                            image: '',
                            lesson: 12,
                            notification: true,
                            star: 3,
                            title: 'Time management'
                        }}
                    />
                    <CatalogCard onChangeTab={() => {}} active data={{
                            image: '',
                            lesson: 12,
                            notification: false,
                            star: 5,
                            title: 'Time management'
                        }} />
                </Grid>
                <Grid item lg={1} className="left-side__column" />
            </S.LeftSide>
            <S.RightSide></S.RightSide>
        </S.Content>
    );
}

export default CatalogPage;
