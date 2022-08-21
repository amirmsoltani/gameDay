import { MuiButton } from '@/components/base/Button';
import { Box, Grid, styled, useTheme } from '@mui/material';
import BusinessInfo from './components/business-info';
import PersonalInfo from './components/personal-info';

const SubmitButton = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: 'white',
    width: 350,
    ':hover': {
        background: theme.palette.primary.main
    }
}));

const HealerStepOne = ({ value, setValue, formikValue }) => {
    const theme = useTheme();

    return (
        <>
            <Grid container style={{ marginTop: 50 }}>
                <Grid item xs={12} md={6}>
                    <PersonalInfo formikValue={formikValue} value={value} setValue={setValue} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BusinessInfo value={value} setValue={setValue} formikValue={formikValue} />
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: {xs: 'flex-start', md:'center'} }}>
                <SubmitButton type="submit">Next Step</SubmitButton>
            </Box>
        </>
    );
};

export default HealerStepOne;
