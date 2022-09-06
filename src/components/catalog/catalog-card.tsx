import React, { FC, useState } from 'react';
import { StarFillIcon } from 'src/assets/common/StarIcon';
import { MImage } from '../base/image/MImage';
import { MButton } from '../base/MButton';
import * as S from './catalog-card-style';

type PropsType = {
    active?: boolean;
    onChangeTab: (tab: 'learn' | 'skill') => void;
    children?: undefined;
    data: {
        image: string;
        title: string;
        lesson: number;
        star: number;
        notification: boolean;
    };
};

const CatalogCard: FC<PropsType> = ({ active, data, onChangeTab }) => {
    const [activeTab, seActiveTab] = useState<'learn' | 'skill'>('learn');

    return (
        <S.CardWrapper className={active && 'active'}>
            <div className="catalog-card__colum1">
                <span>Time management</span>

                <span className="catalog-card__lesson-text">12 Lessons</span>
                <div>
                    {[...new Array(data.star)].map(() => (
                        <StarFillIcon className="catalog-card__star-icon" />
                    ))}
                </div>
            </div>
            <div className="catalog-card__colum2">
                <MImage
                    resources={{ src: data.image, fallback: '/images/user.jpg' }}
                    className="catalog-card__image"
                />
            </div>
            <div className="catalog-card__footer">
                <MButton>Learn</MButton>
                <div className='catalog-card__footer__separator'/>
                <MButton>skills</MButton>
            </div>
        </S.CardWrapper>
    );
};

export default CatalogCard;
