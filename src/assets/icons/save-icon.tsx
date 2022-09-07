import { SvgIconProps } from '@mui/material';
import React, { FC } from 'react';

const SaveIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="MDI_note-edit"
            data-name="MDI / note-edit"
            width="30"
            height="30"
            viewBox="0 0 30 30">
            <g id="Boundary" stroke="rgba(0,0,0,0)" strokeWidth="1" opacity="0">
                <rect width="30" height="30" stroke="none" />
                <rect x="0.5" y="0.5" width="29" height="29" fill="none" />
            </g>
            <path
                id="Path_note-edit"
                data-name="Path / note-edit"
                d="M25.231,11.612v-1.23L17.821,3H5.47A2.457,2.457,0,0,0,3,5.461V22.685a2.465,2.465,0,0,0,2.47,2.461h7.41v-2.3L23.243,12.523a3.207,3.207,0,0,1,1.988-.91M16.586,4.846l6.793,6.767H16.586V4.846m10.93,11.922-1.21,1.206-2.52-2.51L25,14.258a.628.628,0,0,1,.889,0l1.63,1.624a.622.622,0,0,1,0,.886m-4.594-.443,2.52,2.51L17.87,26.376h-2.52v-2.51Z"
                transform="translate(-0.351 0.974)"
            />
        </svg>
    );
};

export default SaveIcon;
