

import { SvgIconProps } from '@mui/material';
import React, { FC } from 'react';

const TrashIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="14.5"
            height="17.5"
            viewBox="0 0 14.5 17.5">
            <g xmlns="http://www.w3.org/2000/svg" id="delete_5_" data-name="delete (5)">
                <path
                    id="Path_19512"
                    data-name="Path 19512"
                    d="M1.161,5.211v10.1a2.262,2.262,0,0,0,.6,1.56,2.019,2.019,0,0,0,1.465.633h7.758a2.019,2.019,0,0,0,1.465-.633,2.262,2.262,0,0,0,.6-1.56V5.211a1.566,1.566,0,0,0-.4-3.08h-2.1V1.618A1.611,1.611,0,0,0,8.928,0H5.286a1.611,1.611,0,0,0-1.624,1.62v.513h-2.1a1.566,1.566,0,0,0-.4,3.08Zm9.825,11.476H3.228a1.3,1.3,0,0,1-1.246-1.374V5.247H12.233V15.314a1.3,1.3,0,0,1-1.246,1.374ZM4.483,1.618a.79.79,0,0,1,.8-.8H8.928a.79.79,0,0,1,.8.8v.513H4.483ZM1.563,2.951H12.651a.738.738,0,0,1,0,1.476H1.563a.738.738,0,1,1,0-1.476Zm0,0"
                    strokeWidth="0.3"
                />
            </g>
        </svg>
    );
};

export default TrashIcon;
