import React, { FC } from 'react';
import { LocationIcon } from 'src/assets/icons/location-icon';
import { PublishIcon } from 'src/assets/icons/publish-icon';
import { TimeIcon } from 'src/assets/icons/time-icon';
import { MImage } from '../base/image/MImage';
import * as S from './jobs-card-style';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

type PropsType = {
    active?: boolean;
    onClick: () => void;
    children?: undefined;
    data: {
        company?: {
            title?: string;
            iconUrl?: string;
        };
        jobType?: string;
        title?: string;
        city?: string;
        experienceLevel?: string;
        createdDate?: string;
        notification?: boolean;
    };
};

// type CompanyType = GetJobsQuery['job_getJobs']['result']['items'];

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 35,
    height: 19,
    padding: 0,
    margin: 5,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2.5,

        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: 'theme.palette.primary.main',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.common.white,
                // theme.palette.mode === 'dark' ? '#2ECA45' : theme.palette.common.white,
                opacity: 1,
                border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
            }
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff'
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
        }
    },
    ' .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 14,
        height: 14
    },
    '.MuiSwitch-track': {
        borderRadius: 20 / 2,
        border: '1px solid #fff',
        backgroundColor: theme.palette.primary.main,
        // backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500
        })
    }
}));

const JobsCard: FC<PropsType> = ({ active, data, onClick }) => {
    return (
        <S.CardWrapper className={active && 'active'} onClick={onClick}>
            <div className="Jobs-card__row1">
                <div className="jobs-card__companyLogo">
                    <MImage
                        resources={{ src: data?.company?.iconUrl, fallback: '/images/user.jpg' }}
                        className="jobs-card__logo"
                    />
                    <span className="jobs-card__text">{data?.company?.title}</span>
                </div>
                <div className="jobs-card__toggle">
                    <FormControlLabel
                        control={<IOSSwitch defaultChecked />}
                        label={
                            <Typography sx={{ color: '#fff' }} variant="caption">
                                Active
                            </Typography>
                        }
                    />
                </div>
            </div>
            <div className="jobs-card__row2 ">
                <span className="jobs-card__title">{data.title}</span>
            </div>
            <div className="jobs-card__row3">
                <LocationIcon />
                <span className="jobs-card__item">{data.city}</span>
                <br />
                <TimeIcon />
                <span className="jobs-card__item">{data.jobType}</span>
                <br />
                <PublishIcon />
                <span className="jobs-card__item">{data.experienceLevel}</span>
                <br />
            </div>
            <div className="jobs-card__row4">
                <span className="jobs-card__title">{data.createdDate}</span>
            </div>
        </S.CardWrapper>
    );
};

export default JobsCard;
