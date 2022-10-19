import React, { FC } from 'react';
import { VideoPlayerWrapper } from './video-player-style';

type PropsType = { url?: string; onClose: () => void };
const VideoPlayer: FC<PropsType> = ({ url, onClose }) => {
    if (!url) {
        return null;
    }
    return (
        <VideoPlayerWrapper
            className="video__player"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}>
            <video controls>
                <source src={url} />
            </video>
        </VideoPlayerWrapper>
    );
};

export default VideoPlayer;
