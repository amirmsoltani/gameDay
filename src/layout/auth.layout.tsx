import { StyledColumn } from '@/components/base/view-container/Column';
// import { Container } from '@/components/base/view-container/Container';
import styled from '@emotion/styled';

import BaseLayout from './base.layout';

type Props = AppLocalization & AppCommonChild & {};

const AuthOuterContainer = styled.div(({ theme }) => ({
    backgroundColor: theme.palette.background.auth
}));
const AuthInnerContainer = styled(StyledColumn)(({ theme }) => ({
    minHeight: '100vh',
    margin: 'auto',
    position: 'relative',
    maxWidth: 'unset'
}));

const StyledImage = styled.img(({ theme }) => ({
    height: 'auto',
    width: '650px',
    position: 'absolute',
    right: '10%',
    top: '50%',
    transform: 'translateY(-50%)',
    [theme.breakpoints.down.sm]: {
        width: '100%',
        right: 0,
        objectFit: 'cover'
    }
}));

const AuthLayout = ({ children, ...rest }: Props) => {
    return (
        <BaseLayout {...rest}>
            <AuthOuterContainer>
                <AuthInnerContainer maxWidth="lg">
                    {children}

                    <StyledImage src="/images/DoctorAndChild.png" />
                </AuthInnerContainer>
            </AuthOuterContainer>
        </BaseLayout>
    );
};

export default AuthLayout;
