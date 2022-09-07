import { SvgIconProps } from '@mui/material';
import React, { FC } from 'react';

const PlayIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="58"
            height="58"
            viewBox="0 0 58 58">
            <rect
                id="Boundary-2"
                data-name="Boundary"
                width="58.504"
                height="58.504"
                transform="translate(0 0)"
                opacity="0"
            />
            <path
                id="Path_motion-play-2"
                data-name="Path / motion-play"
                d="M50.753,26.377A24.323,24.323,0,0,0,26.377,2a25.29,25.29,0,0,0-8.239,1.365l1.706,4.729A17.437,17.437,0,0,1,26.377,6.8,19.574,19.574,0,1,1,6.8,26.377a17.844,17.844,0,0,1,1.292-6.63L3.365,18.137A25.29,25.29,0,0,0,2,26.377a24.377,24.377,0,1,0,48.753,0M10.459,6.8a3.693,3.693,0,1,1,0,7.386A3.747,3.747,0,0,1,6.8,10.459,3.783,3.783,0,0,1,10.459,6.8M41,26.377A14.626,14.626,0,1,0,26.377,41,14.575,14.575,0,0,0,41,26.377m-7.313,0L21.5,33.69V19.064"
                transform="translate(2.875 2.876)"
            />
        </svg>
    );
};

export default PlayIcon;
