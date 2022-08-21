
import { styled } from '@mui/material';

export const CustomDivSpacer = styled('div')({
    ['@media (max-width:950px)']: {
        minWidth: 0,
        minHeight: 0,
    },
    minWidth: '10vw',
})


export const Space = ({ value }) => {
    return (
        <CustomDivSpacer >
            {value}
        </CustomDivSpacer>
    )
}

export default Space