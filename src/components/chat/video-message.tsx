import React, { FC } from 'react'
import PlayIcon from 'src/assets/icons/play-icon';
import { MessageType } from 'src/graphql/generated';


type PropsType = {
    videoUrl: string;
    messageType?: MessageType;
};

const VideoMessage: FC<PropsType> = ({ videoUrl, messageType = MessageType.Video }) => {
    const splits = videoUrl.split('/');
    const fileName = splits[splits.length - 1];
    return (
        <a
            className={`info__video ${messageType === MessageType.Video ? '' : 'file'}`}
            href={videoUrl}
            download
            target="_blank">
            {messageType === MessageType.Video ? <PlayIcon /> : <div className="info__icon" />}
            {fileName.length > 15
                ? fileName.slice(0, 15) + '[...].' + fileName.split('.')[1]
                : fileName}
        </a>
    );
};

export default VideoMessage