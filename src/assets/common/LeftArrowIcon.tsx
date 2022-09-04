import React from 'react';
import StyledSvgIcon from '../icons/SvgIcon';

export const LeftArrowIcon = (props: CommonIconProps) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 24 24">
            <path
                d="M16.2541 4.24106C16.5522 4.53326 16.5793 4.99051 16.3354 5.31272L16.2541 5.40503L9.52658 12L16.2541 18.595C16.5522 18.8872 16.5793 19.3444 16.3354 19.6666L16.2541 19.7589C15.956 20.0511 15.4896 20.0777 15.161 19.8386L15.0668 19.7589L7.7459 12.582C7.44784 12.2898 7.42074 11.8325 7.66461 11.5103L7.7459 11.418L15.0668 4.24106C15.3947 3.91965 15.9262 3.91965 16.2541 4.24106Z"
                fill="#currentColor"
            />
        </StyledSvgIcon>
    );
};

export const LeftArrowBackIcon = (props: CommonIconProps) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 22 17.998" id="Iconly_Light_Arrow_-_Right">
            <path
                id="Icon_metro-arrow-left"
                data-name="Icon metro-arrow-left"
                d="M12.816,23.343l-7.857-7.5a1.452,1.452,0,0,1,0-2.121l7.857-7.5a1.625,1.625,0,0,1,2.222,0,1.452,1.452,0,0,1,0,2.121L9.864,13.283H24.927a1.5,1.5,0,1,1,0,3H9.864l5.175,4.939a1.452,1.452,0,0,1,0,2.121A1.625,1.625,0,0,1,12.816,23.343Z"
                transform="translate(-4.499 -5.784)"
                fill="currentColor"
            />
        </StyledSvgIcon>
    );
};
