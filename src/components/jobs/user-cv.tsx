import React, { FC } from 'react';
import { MImage } from '../base/image/MImage';
import * as S from './jobs-style';

type PropsType = {
    active?: boolean;
    children?: undefined;
    data: {
        user: {
            name: string;
            lastName: string;
            icon: string;
        };
        email: string;
        situation: number;
    };
};

const UserCv: FC<PropsType> = ({ active, data }) => {
    return (
        <S.UserCV>
            <div className="Jobs-card__row1">
                <div className="jobs-card__companyLogo">
                    <MImage
                        resources={{ src: data?.user?.icon, fallback: '/images/user.jpg' }}
                        className="jobs-card__logo"
                    />
                    <span className="jobs-card__text">
                        Ali {data?.user.name}
                        Ahmadi {data?.user.lastName}
                    </span>
                </div>
            </div>
        </S.UserCV>
    );
};

export default UserCv;
