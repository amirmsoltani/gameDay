import { Grid, Typography, Box, styled, Button } from '@mui/material';
import { useRouter } from 'next/router';


const BackButton = styled(Button)({
    backgroundColor: '#5293D3',
    color: '#fff',
    width: '40%',
    marginTop: '50px',
    borderRadius: '25px',
    height: '60px',
    '&:hover': {
        backgroundColor: '#fff',
        border: '1px solid #5293D3',
        "& .MuiTypography-root": {
            color: "#5293D3 !important",
        }
    },
});

const BackgroundColor = styled('div')(({ theme }) => ({
    background: `linear-gradient(to bottom,  #EFAABC 0%,#E99FB3 100%)`,
    [theme.breakpoints.down("sm")]: {
        height:'100vh',
        overflow:'hidden'
    }
}));

const CustomImage = styled('div')(({ theme }) => ({
    backgroundImage: `url("/images/access-deny.png")`,
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    [theme.breakpoints.down("sm")]: {
        backgroundSize: '120% 50%',
    }
}));

const CustomCenter = styled(Box)({
    display: 'flex',
    justifyContent: 'center'
})

const AccessDeny = () => {
    const router = useRouter();
    return (
        <BackgroundColor>
            <CustomImage>
                <Grid container>
                    <Grid item md={6} xs={12} >
                        <CustomCenter style={{ height: '60vh' }}>
                            <img src="/images/403.png" alt="image" style={{ width: '20%', height: '100%' }} />
                        </CustomCenter>
                        <Typography variant="h2" style={{ textAlign: 'center', color: '#213950', fontWeight: 'bold', fontStyle: 'italic' }}>Access forbiden</Typography>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <Typography variant="h2" style={{ textAlign: 'center', color: '#213950', fontSize: '25px', marginTop: '25px', maxWidth: '500px' }} >you tried to access a page you did not
                            have prior authorization for</Typography></div>
                        <CustomCenter>
                            <BackButton onClick={() => router.back()}>
                                <Typography sx={{ color: '#fff' }}>Go Back Home</Typography>
                            </BackButton>
                        </CustomCenter>

                    </Grid>
                    <Grid item md={6} xs={12} sx={{ minHeight: '100vh' }} >

                    </Grid>
                </Grid>
            </CustomImage>
        </BackgroundColor>
    );
};

export default AccessDeny;
