import { SvgIconProps } from '@mui/material';
import React, { FC } from 'react';

const SendIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <g xmlns="http://www.w3.org/2000/svg" id="_1933005" data-name="1933005">
                <path
                    id="Path_13"
                    data-name="Path 13"
                    d="M8.75,17.612V22.25a.75.75,0,0,0,1.354.444L12.817,19Z"
                    transform="translate(0 0)"
                    fill="#1fb5eb"
                />
                <path
                    id="Path_14"
                    data-name="Path 14"
                    d="M23.685.139A.75.75,0,0,0,22.9.085L.4,11.835a.75.75,0,0,0,.1,1.375l6.255,2.138L20.083,3.958,9.775,16.377,20.258,19.96A.767.767,0,0,0,20.5,20a.749.749,0,0,0,.742-.639l2.75-18.5a.751.751,0,0,0-.307-.722Z"
                    transform="translate(0 0)"
                    fill="#1fb5eb"
                />
            </g>
        </svg>
    );
};

export default SendIcon;
