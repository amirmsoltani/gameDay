import styled from '@emotion/styled';

const SuccessIconContainer = styled.div({
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const SuccessBody = styled.div({
    flex: '5',
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column'
});

const Title = styled.div({
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    margin: '22px auto'
});

const SubTitle = styled.div({
    fontSize: 18,
    marginBottom: '18px'
});

export const SUCCESS_MAIL_ID = 'SUCCESS_MAIL_ID';
function SuccessEmailModal() {
    return (
        <div>
            <SuccessIconContainer></SuccessIconContainer>
            <SuccessBody>
                <Title>You've got mail!</Title>
                <div style={{ height: '10px' }} />
                <SubTitle>we have sent a password recovery instructions to you're email.</SubTitle>
            </SuccessBody>
        </div>
    );
}

export default SuccessEmailModal;
