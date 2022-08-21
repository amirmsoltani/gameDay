import themeObj from '@/provider/theme/themeObject';
import styled from '@emotion/styled';
import { SpinnerCircular } from 'spinners-react';

export const StyledSpinner = styled(SpinnerCircular)<{ css?: any }>(({ theme, css }) => ({
    ...(css && css),
    color: theme.palette.paginate.main,
    secondaryColor: '#F00'
}));

export const StyledButtonSpinner = styled(StyledSpinner)({
    position: 'absolute',
    top: '50%',
    transform: ' translate(0px, -50%)'
});

export const PrimarySpinner = () => {
    return (
        <StyledButtonSpinner
            color={themeObj.palette.palette.paginate.main}
            secondaryColor={themeObj.palette.palette.grey['100']}
        />
    );
};
