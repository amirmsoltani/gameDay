import React, { FC, useEffect, useState } from 'react';
import { StarFillIcon } from 'src/assets/common/StarIcon';
import FlagIcon from 'src/assets/icons/flag-icon';
import LearnIcon from 'src/assets/icons/learn-icon';
import { MImage } from '../base/image/MImage';
import { MButton } from '../base/MButton';
import * as S from './catalog-card-style';

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

const CatalogCard: FC<PropsType> = ({ active, data, onChangeTab, onClick }) => {
    const [activeTab, setActiveTab] = useState<'learn' | 'skills'>('learn');

    useEffect(() => {
        if (active) {
            onChangeTab(activeTab);
        }
    }, [active]);

    const onChange = (tab: 'skills' | 'learn') => () => {
        setActiveTab(tab);
        onChangeTab(tab);
    };

    return (
        <S.CardWrapper className={active && 'active'} onClick={onClick}>
            {data.notification && <div className="catalog-card__badge" />}
            <div className="catalog-card__colum1">
                <span>{data.title}</span>

                <span className="catalog-card__lesson-text">{data.lesson} Lessons</span>
                <div>
                    {[...new Array(data.star)].map((_, index) => (
                        <StarFillIcon className="catalog-card__star-icon" key={index} />
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
                <MButton
                    onClick={onChange('learn')}
                    className={`catalog-card__footer__btn ${
                        activeTab === 'learn' ? 'active' : ''
                    }`}>
                    <LearnIcon />
                    Learn
                </MButton>
                <div className="catalog-card__footer__separator" />
                <MButton
                    onClick={onChange('skills')}
                    className={`catalog-card__footer__btn ${
                        activeTab === 'skills' ? 'active' : ''
                    }`}>
                    <FlagIcon />
                    skills
                </MButton>
            </div>
        </S.CardWrapper>
    );
};

export default CatalogCard;
