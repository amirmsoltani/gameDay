import { styled } from '@mui/material';
import { Box } from '@mui/system';

const MainContainer = styled('div')(({ theme }) => ({
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'row-reverse',
    backgroundColor: theme.palette.primary.light,
    '@media(max-width:700px)': {
        paddingBottom: 15
    }
}));

const BackgroundIMG = styled(Box)<{ src: boolean; mobileSrc: boolean }>(
    ({ theme, src, mobileSrc }) => ({
        width: '50vw',
        height: '100vh',
        maxWidth: '600px',
        marginRight: '8vw',
        objectFit: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundImage: `url(${src})`,
        [theme.breakpoints.down('md')]: {
            width: '100vw',
            height: '100vh',
            marginRight: 0,
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${mobileSrc})`
        }
    })
);

const FormCard = styled(Box)<{ tallMode: boolean }>(({ theme, tallMode }) => ({
    top: '40%',
    left: '8vw',
    maxWidth: 450,
    overflow: 'auto',
    borderRadius: 19,
    position: 'absolute',
    background: '#FFFFFF',
    transform: 'translateY(-40%)',
    minHeight: '500px',
    maxHeight: tallMode ? '98%' : '85%',
    padding: tallMode ? '5px 50px' : '20px 50px',
    boxShadow: '1px 3px 8px #4d6c8d30',
    [theme.breakpoints.down('md')]: {
        top: '8%',
        left: '50%',
        margin: 'auto',
        padding: '10px 20px',
        maxHeight: 'fit-content',
        transform: 'translateX(-50%)'
    }
}));

const CommonLayout = ({ form, imageSrc, mobileSrc, tallMode = false }) => {
    return (
        <MainContainer>
            <BackgroundIMG src={imageSrc} mobileSrc={mobileSrc} />
            <FormCard tallMode={tallMode}>{form}</FormCard>
        </MainContainer>
    );
};

export default CommonLayout;
