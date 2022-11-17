import styled from '@emotion/styled';

export const VideoPlayerWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: grid;
    place-content: center;
    backdrop-filter: blur(5px);

    .player__video{
        max-height:37vmax;
        max-width:100%;
    }
`;
