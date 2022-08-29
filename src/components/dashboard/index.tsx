import { Box, Typography } from '@mui/material';
import React from 'react';
import { BarChart } from 'src/assets/common/bar-chart';
import { useGetDashboardQuery } from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { AppLoadingPage } from '../base/loader/LoadingPage';
import { Card } from './card';
import * as S from './dashboard-style';

const repotBoxs = [
    {
        title: 'Courses',
        filed: 'totalCourses',
        color0: '#55D8FE',
        color1: '#54D8FF'
    },
    {
        title: 'Jobs',
        filed: 'totalJobs',
        color0: '#A3A0FB',
        color1: '#A3A0FB'
    },
    {
        title: 'App users',
        filed: 'totalUsers',
        color0: '#D90091',
        color1: '#FF0080'
    },
    {
        title: 'Skills',
        filed: 'totalSkills',
        color0: '#5EE2A0',
        color1: '#5EE2A0'
    }
];

export const DashboardPage = () => {
    const { isLoading, data } = useGetDashboardQuery();

    if (isLoading) {
        return <AppLoadingPage />;
    }

    return (
        <S.Content
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridTemplateRows={'repeat(12, 1fr)'}
            gap={3}>
            {repotBoxs.map((report) => {
                const box = data.user_getReportBoxes.result[report.filed];
                return (
                    <Card column="span 3" title={report.title} key={report.filed}>
                        <S.ReportBody>
                            <div>
                                <Typography className="mini-card__title"> total amount</Typography>
                                <Typography className="mini-card__amount">{box}</Typography>
                                <Typography className="mini-card__percent">13.8%</Typography>
                            </div>
                            <div>
                                <BarChart color0={report.color0} color1={report.color1} />
                            </div>
                        </S.ReportBody>
                    </Card>
                );
            })}

            <Card column="span 6" row="span 9" title="Statistics">
                ss
            </Card>
            <Card
                column="span 6"
                row="span 5"
                title="Courses"
                primary
                headerOptions={<S.AddSkill>Add skill of the day</S.AddSkill>}>
                <S.SkillBody display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                    {data.skill_getSkills.result.items.map((skill) => (
                        <Box gridColumn={'span 1'} key={skill.title}>
                            <MImage
                                resources={{ src: skill.iconUrl, fallback: '/images/gd-logo.png' }}
                                className="skill-body__image"
                            />
                            <Typography className="skill-body__title">{skill.title}</Typography>
                            <Typography className="skill-body__category">
                                {skill.skillCategory?.title}
                            </Typography>
                        </Box>
                    ))}
                </S.SkillBody>
            </Card>

            <Card column="span 6" row="span 4" title="top users">
                <S.UserBody display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={9}>
                    {data.user_getTopUsers.result.items.map((user, index) => (
                        <Box gridColumn={'span 1'} key={user.firstName}>
                            <div className='user-body__imagebox'>
                                {!index && (
                                    <MImage resources={{ src: '/images/dashboard/crown.png' }} className="user-body__crown" />
                                )}
                                <MImage
                                    resources={{
                                        src: user.pictureUrl,
                                        fallback: '/images/user.jpg'
                                    }}
                                    className="user-body__image"
                                />
                            </div>
                            <Typography className="user-body__name">
                                {user.firstName + ' ' + user.lastName}
                            </Typography>
                            <Typography className="user-body__point">
                                {user.point} points
                            </Typography>
                        </Box>
                    ))}
                </S.UserBody>
            </Card>
        </S.Content>
    );
};
