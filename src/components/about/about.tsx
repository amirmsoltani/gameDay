import { Box, Container, Grid, styled, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import EmailIcon from 'src/assets/icons/about/email';
import PhoneIcon from 'src/assets/icons/about/phone';
import { MuiButton } from '../base/Button';
import { MInputFormik } from '../base/input/MInput';
import { MSelectFormik } from '../base/input/MSelect';
import { Spacer } from '../base/spacer';
import * as Yup from 'yup';
// import { useUsersQuestions_AddUsersQuestionsMutation } from 'src/graphql/generated';
// import { useSnackbar } from 'notistack';

const TopImageBox = styled(Box)({
    width: 450,
    height: 650,
    borderRadius: '49% 49% 0 0',
    backgroundImage: 'url("/images/about/girl.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: 'auto'
});

const MidleImageBox = styled(Box)({
    width: 320,
    height: 490,
    // borderRadius: '49% 49% 0 0',
    backgroundImage: 'url("/images/about/flowers.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: 'auto'
});

const CompanyTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    fontFamily: 'Yeseva One',
    whiteSpace: 'nowrap'
}));

const CompanyDescription = styled(Typography)(({ theme }) => ({
    fontSize: 28,
    color: theme.palette.secondary.dark,
    textAlign: 'justify'
}));

const IconInfoContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
});

const ContactInfoText = styled(Typography)({
    color: 'black',
    fontSize: 18
});

const MessageTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
}));

const SendBtn = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: 'white',
    fontSize: 18,
    ':hover': {
        background: theme.palette.primary.main
    }
}));

const AboutPage = () => {
    // const {mutate, isLoading} = useUsersQuestions_AddUsersQuestionsMutation();
    // const {enqueueSnackbar} = useSnackbar();
    return (
        <Container maxWidth="xl" sx={{ margin: 'auto', padding: { xs: '30px', md: '50px 107px' } }}>
            <Grid container display="flex" alignItems="center">
                <Grid item xs={12} md={6} lg={5} xl={4}>
                    <TopImageBox />
                </Grid>
                <Grid item xs={12} md={6} lg={7} xl={8}>
                    <CompanyTitle marginLeft={{ xs: 0, md: '-70px' }} fontSize={{ xs: 59, md: 89 }}>
                        Our company
                    </CompanyTitle>
                    <CompanyDescription marginLeft={{ xs: 0, md: '100px', lg: '55px' }}>
                        Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy
                        Eirmod Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Lorem Ipsum Dolor
                        Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Consetetur
                        Sadipscing Elitr, Sed Diam Nonumy Eirmod
                    </CompanyDescription>
                </Grid>
            </Grid>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', sm: 'column' },
                        justifyContent: 'center',
                        marginTop: { xs: '50px', sm: 0 }
                    }}>
                    <IconInfoContainer>
                        <EmailIcon />
                        <Spacer space={10} />
                        <ContactInfoText>C4healing@Google.Com</ContactInfoText>
                    </IconInfoContainer>
                    <Spacer space={50} />
                    <IconInfoContainer>
                        <PhoneIcon />
                        <Spacer space={10} />
                        <ContactInfoText>+1234567890</ContactInfoText>
                    </IconInfoContainer>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} marginTop="100px" paddingX="10px">
                    <Formik
                        initialValues={{ name: ``, email: ``, title: ``, message: `` }}
                        validationSchema={Yup.object({
                            name: Yup.string().required('Please enter your name!'),
                            email: Yup.string()
                                .email('Please enter a valid email!')
                                .required('Please enter your email!'),
                            title: Yup.string().required('Title is required!'),
                            message: Yup.string().required('Message is required!')
                        })}
                        onSubmit={() => {}}>
                        {/* })} onSubmit={onSubmitHandler}> */}
                        <Form>
                            <MessageTitle>Ask Your Question</MessageTitle>
                            <Spacer space={25} />
                            <MInputFormik name="name" placeholder="Name" fullWidth />
                            <MInputFormik name="email" placeholder="Enter Email" fullWidth />
                            <MSelectFormik
                                name="title"
                                placeholder="Title"
                                rounded
                                label="Title"
                                holder
                                options={[
                                    { option: 'Payment', value: 'payment' },
                                    { option: 'course Booking', value: 'booking' },
                                    { option: 'Contact with admin', value: 'admin' },
                                    { option: 'Sign up', value: 'signup' }
                                ]}
                            />
                            <MInputFormik
                                name="message"
                                placeholder="Type..."
                                label="Your Message"
                                multiline
                                rows={6}
                                fullWidth
                            />
                            <SendBtn type="submit" loading={false}>
                                Send
                            </SendBtn>
                        </Form>
                    </Formik>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Spacer space={20} />
                    <MidleImageBox />
                </Grid>
            </Grid>
        </Container>
    );

    // function onSubmitHandler(v, { resetForm }){
    //     mutate({usersQuestions: {name: v.name, email: v.email, subject: v.title, question: v.message}}, {
    //         onSuccess: () => {
    //             enqueueSnackbar('Message sent successfully!', {variant: 'success'});
    //             resetForm();
    //         },
    //         onError: () => {enqueueSnackbar('Operation failed!', {variant: 'error'})}
    //     })
    // }
};

export default AboutPage;
