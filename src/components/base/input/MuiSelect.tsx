import React, { forwardRef, memo } from 'react';
import { Select, styled } from '@mui/material';
// import { DownWardArrow } from 'src/assets/auctions/DownWardArrow';

const CustomSelect = styled(Select)(({ theme }) => ({
    // '& svg': {
    //     display: 'none'
    // }
}));

export const MuiSelect = memo(
    forwardRef(({ size = 'small', ...props }: any, ref) => {
        return (
            <div style={{ position: 'relative', display: 'flex' }}>
                <CustomSelect
                    fullWidth
                    size={size}
                    {...props}
                    ref={ref}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 250 } },...props.MenuProps }}
                    IconComponent = {props.Icon}
                />
                {/* <div
                    style={{
                        position: 'absolute',
                        right: 20,
                        bottom: 8,
                        zIndex: +1000,
                        pointerEvents: 'none'
                    }}>
                    <DownWardArrow />
                </div> */}
            </div>
        );
    })
);
