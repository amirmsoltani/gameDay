import React from 'react';
import StyledSvgIcon from '../icons/SvgIcon';

const RightArrowIcon = (props: CommonIconProps) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 24 24">
            <g data-name="Arrow - Right 2" transform="translate(7.5 4)">
                <path
                    data-name="Arrow - Right 2"
                    d="M.246,15.759a.811.811,0,0,1-.081-1.072l.081-.092L6.973,8,.246,1.405A.811.811,0,0,1,.165.333L.246.241A.852.852,0,0,1,1.339.161l.094.08L8.754,7.418A.811.811,0,0,1,8.835,8.49l-.081.092L1.433,15.759A.852.852,0,0,1,.246,15.759Z"
                    fill="#D5623D"
                />
            </g>
        </StyledSvgIcon>
    );
};
export const RightArrowForwardIcon = (props: CommonIconProps) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 15 14">
            <path
                id="Fill_4"
                d="M.34,8.827l5.832,5.844a1.2,1.2,0,0,0,1.656,0L13.66,8.827A1.167,1.167,0,0,0,12,7.183L8.166,11.028V1.164a1.167,1.167,0,0,0-2.334,0v9.864L1.994,7.183A1.166,1.166,0,0,0,.34,8.827"
                transform="translate(0 14) rotate(-90)"
                fill="currentColor"
            />
        </StyledSvgIcon>
    );
};

export default RightArrowIcon;
