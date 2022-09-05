import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ApplicantList } from './applicant-list';
import * as S from './jobs-styled';
import { JobCard } from './jod-card';

export const JobsPage = () => {
    const [activeJobId, setActiveJobId] = useState();
    const data = [
        {
            id: 1,
            title: 'UI UX Designer',
            city: 'Amsterdam',
            time: 'Full time',
            level: ' xp. level: Senior',
            publish: '10 days ago'
        },
        {
            id: 2,
            title: 'UI UX Designer',
            city: 'Amsterdam',
            time: 'Full time',
            level: ' xp. level: Senior',
            publish: '10 days ago'
        },
        {
            id: 3,
            title: 'UI UX Designer',
            city: 'Amsterdam',
            time: 'Full time',
            level: ' xp. level: Senior',
            publish: '10 days ago'
        },
        {
            id: 4,
            title: 'UI UX Designer',
            city: 'Amsterdam',
            time: 'Full time',
            level: ' xp. level: Senior',
            publish: '10 days ago'
        },
        {
            id: 5,
            title: 'UI UX Designer',
            city: 'Amsterdam',
            time: 'Full time',
            level: ' xp. level: Senior',
            publish: '10 days ago'
        },
        {
            id: 6,
            title: 'UI UX Designer',
            city: 'Amsterdam',
            time: 'Full time',
            level: ' xp. level: Senior',
            publish: '10 days ago'
        }
    ];
    return (
        <Grid container>
            <Grid item xs={12} md={5} lg={3}>
                <S.ScrollBarJobs>
                    {data?.map((dt) => {
                        return (
                            <JobCard
                                id={dt.id}
                                key={dt.id}
                                title={dt.title}
                                city={dt.city}
                                time={dt.time}
                                level={dt.level}
                                publish={dt.publish}
                            />
                        );
                    })}
                </S.ScrollBarJobs>
            </Grid>
            <Grid item xs={12} md={7} lg={9}>
                {/* <ApplicantList /> */}
            </Grid>
        </Grid>
    );
};
