import React, { FC } from 'react'
import PlayIcon from 'src/assets/icons/play-icon';


type PropsType ={
    videoUrl:string;
};

const VideoMessage: FC<PropsType> = ({ videoUrl }) => {
    const splits = videoUrl.split('/');
    const fileName = splits[splits.length - 1];
    return (
        <a className="info__video" href={videoUrl} download={videoUrl}>
            <PlayIcon />
            {fileName.length > 15
                ? fileName.slice(0, 15) + '[...].' + fileName.split('.')[1]
                : fileName}
        </a>
    );
};

export default VideoMessage