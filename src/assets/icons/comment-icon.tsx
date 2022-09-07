import { SvgIconProps } from '@mui/material';
import React, { FC } from 'react';

const CommentIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            id="MDI_chat"
            data-name="MDI / chat"
            width="30"
            height="30"
            viewBox="0 0 30 30">
            <g id="Boundary" stroke="rgba(0,0,0,0)" stroke-width="1" opacity="0">
                <rect width="30" height="30" stroke="none" />
                <rect x="0.5" y="0.5" width="29" height="29" />
            </g>
            <path
                id="Path_chat"
                data-name="Path / chat"
                d="M15,3c7.15,0,13,4.773,13,10.667S22.15,24.333,15,24.333a16.064,16.064,0,0,1-4.589-.667A13.985,13.985,0,0,1,2,27c3.029-3.107,3.51-5.2,3.575-6A9.71,9.71,0,0,1,2,13.667C2,7.773,7.85,3,15,3Z"
                transform="translate(0)"
            />
        </svg>
    );
};

export default CommentIcon;
