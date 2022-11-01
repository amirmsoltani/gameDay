import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { BarChart } from 'src/assets/common/bar-chart';
import { useGetDashboardQuery } from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { AppLoadingPage } from '../base/loader/LoadingPage';
import { Card } from './card';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScriptableContext
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
import * as S from './dashboard-style';
import dayjs from 'dayjs';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import Link from 'next/link';

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
const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        y: {
            ticks: {
                stepSize: 1
            }
        }
    },
    elements: {
        line: {
            tension: 0.35
        }
    },
    plugins: {
        filler: {
            propagate: false
        },
        legend: {
            display: false
        }
    },
    interaction: {
        intersect: true
    }
};

export const DashboardPage = () => {
    const { isLoading, data } = useGetDashboardQuery();

    const getChartData = useMemo(() => {
        if (!data) return undefined;
        return {
            labels: data.report_getChartViewApp?.result.items.map((item) =>
                dayjs(item.timeStamp).format('MMM')
            ),
            datasets: [
                {
                    label: 'View',
                    data: data.report_getChartViewApp?.result.items.map((item) => item.total),
                    fill: 'start',
                    backgroundColor: (context: ScriptableContext<'line'>) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 200, 0, 0);
                        gradient.addColorStop(0, '#FFFFFF00');
                        gradient.addColorStop(1, '#7251B2');
                        return gradient;
                    },
                    borderColor: '#7251B2',
                    borderWidth: 2
                }
            ]
        };
    }, [data]);

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
                            </div>
                            <div>
                                <BarChart color0={report.color0} color1={report.color1} />
                            </div>
                        </S.ReportBody>
                    </Card>
                );
            })}

            <Card column="span 6" row="span 9" title="Statistics">
                <S.ChartBody>
                    <Line data={getChartData} options={options} />
                    <div className="chart-body__chart-map">Application Total views</div>
                </S.ChartBody>
            </Card>
            <Card
                column="span 6"
                row="span 5"
                title="skill of the day"
                primary
                headerOptions={
                    <Link href={'/dashboard/skills'} passHref>
                        <S.AddSkill>
                            <PlusIcon className="plus" /> <span>Add skill of the day</span>
                        </S.AddSkill>
                    </Link>
                }>
                <S.SkillBody display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                    {data.skill_getSkills.result.items.map((skill) => (
                        <Box gridColumn={'span 1'} key={skill.title} className={"item__box"}>
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
                            <div className="user-body__imagebox">
                                {!index && (
                                    <MImage
                                        resources={{ src: '/images/dashboard/crown.png' }}
                                        className="user-body__crown"
                                    />
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
