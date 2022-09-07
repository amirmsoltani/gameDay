import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { StarFillIcon } from 'src/assets/common/StarIcon';
import FlagIcon from 'src/assets/icons/flag-icon';
import LearnIcon from 'src/assets/icons/learn-icon';
import { LocationIcon } from 'src/assets/icons/location-icon';
import { PublishIcon } from 'src/assets/icons/publish-icon';
import { TimeIcon } from 'src/assets/icons/time-icon';
import { MImage } from '../base/image/MImage';
import { MButton } from '../base/MButton';
import * as S from './jobs-card-style';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

type PropsType = {
    active?: boolean;
    onChangeTab: (tab: 'learn' | 'skills') => void;
    onClick: () => void;
    children?: undefined;
    data: {
        image: string;
        title: string;
        lesson: number;
        star: number;
        notification: boolean;
    };
};
const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 36,
    height: 19,
    padding: 0,
    margin: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#7251B2',
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
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500
        })
    }
}));

const CatalogCard: FC<PropsType> = ({
    active,
    data,
    onChangeTab,
    onClick,
    title,
    city,
    level,
    time,
    publish,
    id,
    activeJobId,
    seActiveJobId
}) => {
    const router = useRouter();

    const handelClick = () => {
        router.query.jobId = id;
        router.push(router);
    };
    return (
        <S.CardWrapper className={active && 'active'} onClick={onClick}>
            <div className="catalog-card__colum1">
                <span>
                    UI UX Designer <br />
                    <LocationIcon />
                    Amsterdam <br />
                    <TimeIcon />
                    Full time <br />
                    <PublishIcon />
                    xp. level: Senior <br />
                </span>
            </div>
            <div className="catalog-card__colum2">
                <FormControlLabel control={<IOSSwitch defaultChecked />} label="Active" />
            </div>
            <div className="catalog-card__footer">
                <S.BoxJobDay>10 days ago</S.BoxJobDay>
            </div>
        </S.CardWrapper>
    );
};

export default CatalogCard;

// import { Grid, Typography } from '@mui/material';
// import React from 'react';
// import { MImage } from '../base/image/MImage';
// import * as S from './jobs-styled';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch, { SwitchProps } from '@mui/material/Switch';
// import { styled } from '@mui/material/styles';
// import { Spacer } from '../base/spacer';
// import { useRouter } from 'next/router';
// import { LocationIcon } from '../../assets/icons/location-icon';
// import { TimeIcon } from 'src/assets/icons/time-icon';
// import { PublishIcon } from 'src/assets/icons/publish-icon';

// export const JobCard = ({ title, city, level, time, publish, id, activeJobId, seActiveJobId }) => {
//     const router = useRouter();

//     const handelClick = () => {
//         router.query.jobId = id;
//         router.push(router);
//     };

//     console.log(router.query.jobId === String(id), String(id), router.query.jobId);
//     return (
//         <Grid container sx={{ padding: '10px' }}>
//             <S.CardJobs onClick={handelClick} boxActive={router.query.jobId === String(id)}>
//                 <Grid container justifyContent="space-between">
//                     <MImage width="30" margin="10px"></MImage>
//                     <FormControlLabel control={<IOSSwitch defaultChecked />} label="Active" />
//                 </Grid>
//                 <Grid item>
//                     <div>
//                         UI UX Designer
//                         <br />
//                         <LocationIcon />
//                         Amsterdam <br />
//                         <TimeIcon />
//                         Full time <br />
//                         <PublishIcon />
//                         xp. level: Senior <br />
//                     </div>
//                     <S.BoxJobDay>10 days ago</S.BoxJobDay>
//                 </Grid>
//             </S.CardJobs>
//         </Grid>
//     );
// };
