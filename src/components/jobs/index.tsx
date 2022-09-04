import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { ApplicantList } from './applicant-list';
import * as S from './jobs-styled';
import { JobCard } from './jod-card';

export const JobsPage = () => {
    return (
        // <S.Content display="grid">
        <Grid container>
            <Grid item xs={12} md={5} lg={3}>
                <S.ScrollBarJobs>
                    <JobCard></JobCard>
                    <JobCard></JobCard>
                    <JobCard></JobCard>
                    <JobCard></JobCard>
                    <JobCard></JobCard>
                </S.ScrollBarJobs>
            </Grid>
            <Grid item xs={12} md={7} lg={9}>
                <ApplicantList />
            </Grid>
        </Grid>
        // </S.Content>
    );
};
