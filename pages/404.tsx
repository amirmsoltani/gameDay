import { Grid, Typography, Box, styled, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { NotFoundIcon } from 'src/assets/icons/404';
import { NotFoundMaterial } from 'src/assets/icons/404-material';

const BackgroundColor = styled(Grid)(({ theme }) => ({
    background: theme.palette.grey.text,
    padding: 40
}));

const BackButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#8054F6',
    color: '#fff',
    width: '30%',
    height: '70px',
    marginTop: '50px',
    borderRadius: '25px 25px 0px 25px',
    '&:hover': {
        backgroundColor: '#fff',
        border: '1px solid #8054F6',
        '& .MuiTypography-root': {
            color: '#8054F6 !important'
        }
    }
}));

const CustomCenter = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
});

const RelativeText = styled(`div`)(({ theme }) => ({
    position: 'relative'
}));

const AbsoluteMaterial = styled(`div`)({
    position: 'absolute',
    top: '-23px',
    left: '-33px'
});

const NotFoundPage = () => {
    const router = useRouter();
    return (
        <BackgroundColor>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: '100vh' }}>
                <Grid item md={5} xs={12}>
                    <Typography
                        variant="h2"
                        style={{
                            textAlign: 'left'
                        }}>
                        <RelativeText>
                            Oooops!
                            <AbsoluteMaterial>
                                <NotFoundMaterial />
                            </AbsoluteMaterial>
                        </RelativeText>
                    </Typography>
                    <Typography
                        variant="h2"
                        style={{
                            textAlign: 'left',
                            fontSize: '25px',
                            marginTop: '25px'
                        }}>
                        We can’t seem to find a page you
                        <br /> are looking for
                    </Typography>

                    <BackButton onClick={() => router.back()}>
                        <Typography style={{ color: '#fff', fontWeight: 'bold ' }}>
                            Back to home
                        </Typography>
                    </BackButton>
                </Grid>
                <Grid item md={6} xs={12}>
                    <CustomCenter>
                        <NotFoundIcon />
                    </CustomCenter>
                </Grid>
            </Grid>
        </BackgroundColor>
    );
};

export default NotFoundPage;
