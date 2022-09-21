import dayjs from 'dayjs';
import React, { FC } from 'react';
import { MImage } from '../image/MImage';
import { PersonCardWrapper } from './person-card-style';
import isToday from 'dayjs/plugin/isToday';
import AttachmentIcon from 'src/assets/icons/attachment.icon';

dayjs.extend(isToday);

type PropsType = {
    data: {
        image: string;
        fullName: string;
        title: string;
        date: string;
        description: string;
        attachments: number;
    };
    active:boolean;
    onClick:()=>void;
};

const PersonCard: FC<PropsType> = ({ data,active,onClick }) => {
    const cardDate = dayjs(data.date)
    return (
        <PersonCardWrapper
            onClick={onClick}
            className={`${data.attachments ? 'attachment' : ''} ${active ? 'active' : ''}`}>
            <MImage
                resources={{ src: data.image, fallback: '/images/user.jpg' }}
                className="person-card__avatar"
            />
            <div className="person-card__information">
                <div className="information__header">
                    <div className="header__name-box">
                        <span className="name-box__full-name">{data.fullName}</span>
                        <span className="name-box__title">{data.title}</span>
                    </div>
                    <span className="information__date">
                        {cardDate.isToday() ? 'Today' : cardDate.format('YY/DD/MM')}
                        &nbsp; &nbsp;
                        {cardDate.format('HH:mm A')}
                    </span>
                </div>

                <div className="information__description">{data.description}</div>
                {data.attachments ? (
                    <div className="information__attachment">
                        <AttachmentIcon />
                        {data.attachments} Attachments
                    </div>
                ) : null}
            </div>
        </PersonCardWrapper>
    );
};

export default PersonCard;
