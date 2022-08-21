import EarthIcon from 'src/assets/footer/earth.icon';
import MailIcon from 'src/assets/footer/mail.icon';
import InstagramIcon from 'src/assets/footer/instagram.icon';
import { Grid, IconButton, TextField, Typography, Button } from '@mui/material';
import Link from 'next/link';
import {
    FooterContainer,
    HealingTypeContainer,
    HealingTypeTitle,
    HealingTypeBody,
    FooterIcons,
    SocialSectionContainer
} from './styled.footer';
// import { useNewsletter_AddNewsletterMutation } from 'src/graphql/generated';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useResponsive } from 'src/hooks/useResponsive';

export default function Footer() {
    const data = [
        {
            title: 'Traditional Alternative Medicine/Botanicals',
            items: [
                'Integrative Medicine',
                'Naturopathic Medicine',
                'Ayurveda Integrative Medicine',
                'Apitherapy',
                'Traditional Chinese Medicine'
            ],
            path: '/healing/session/?id=1&type=Traditional%20Alternative%20Medicine/Botanicals'
        },
        {
            title: 'Mind Healing ',
            items: [
                'Psych-K',
                'Autosuggestion',
                'Hypnotherapy',
                'Neuro-linguistic Programming',
                'Meditation',
                'Breathwork'
            ],
            path: '/healing/session/?id=2&type=Mind%20Healing'
        },
        {
            title: 'External Energy ',
            items: [
                'Magnetic Therapy',
                'Reiki',
                'Therapeutic Touch',
                'Reconnective Healing',
                'Chakra Healing'
            ],
            path: '/healing/session/?id=4&type=External%20Energy'
        },

        {
            title: 'Sensory Healing ',
            items: ['Aromatherapy', 'Music Therapy', 'Sonopuncture', 'Sound Therapy'],
            path: '/healing/session/?id=5&type=Sensory%20Healing'
        },
        {
            title: 'Nutrition ',
            items: ['Nutritious diet', 'Supplements', 'Testing'],
            path: '/healing/session/?id=6&type=Nutrition'
        },
        {
            title: 'Coaching',
            items: ['Personal Coaching - Life coaching', 'Professional Coaching'],
            path: '/healing/session/?id=7&type=Coaching'
        },
        {
            title: 'Body Healing',
            items: [
                'Acupressure',
                'Acupuncture',
                'Chiropractic',
                'Cranialsacral',
                'Cupping Therapy',
                'Kinesiology',
                'Osteopathy',
                'Pilates',
                'Qigong',
                'Reflexology',
                'Yoga'
            ],
            path: '/healing/session/?id=3&type=Body%20Healing'
        }
    ];

    const isDesktop = useResponsive('up', 'lg');

    return (
        <FooterContainer>
            <Grid container>
                <Grid order={isDesktop ? 0 : 1} item container xs={12} lg={9}>
                    {data.map((item, index) => (
                        <Grid key={index} item xs={12} lg={4} xl={3}>
                            <HealingType key={index} {...item} />
                        </Grid>
                    ))}
                </Grid>
                <Grid order={isDesktop ? 1 : 0} item xs={12} lg={3} mb={5}>
                    <SocialSection />
                </Grid>
            </Grid>
        </FooterContainer>
    );
}

function HealingType({ title = 'healing type', items = [], path }) {
    return (
        <HealingTypeContainer css={{ marginBottom: 24 }}>
            <HealingTypeTitle variant="h5" fontWeight={'bold'}>
                {title}
            </HealingTypeTitle>
            {items.map((item, index) => (
                <HealingTypeBody key={index}>
                    <Link href={path}>
                        <a style={{ textDecoration: 'none', color: '#213950' }}>{item}</a>
                    </Link>
                </HealingTypeBody>
            ))}
        </HealingTypeContainer>
    );
}

function SocialSection() {
    // const { mutate } = useNewsletter_AddNewsletterMutation();
    const { enqueueSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    function validateEmail(emailAdress) {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailAdress.match(regexEmail)) {
            return true;
        } else {
            return false;
        }
    }

    const handleEventKey = (e) => {
        if (e.key === 'Enter') {
            if (validateEmail(email)) {
                // mutate(
                //     {
                //         newsletterInput: {
                //             email: email
                //         }
                //     },
                //     {
                //         onSuccess: () => {
                //             enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                //                 setEmail('');
                //         },
                //         onError: () => {
                //             enqueueSnackbar('Operation Failed!', { variant: 'error' });
                //         }
                //     }
                // );
                setError(false);
            } else {
                setError(true);
            }
        }
    };

    return (
        <SocialSectionContainer>
            <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '20px' }}>
                Bring balance to your inbox
            </Typography>
            <TextArea
                value={email}
                label="Enter email"
                onKeyPress={handleEventKey}
                onChange={(e) => setEmail(e?.target?.value)}
            />
            {error && <Typography sx={{ color: 'red' }}>Please enter valid email</Typography>}
            <MuiButton>Subscribe to newsletter</MuiButton>
            <FooterIcons>
                <IconButton>
                    <EarthIcon width={28} height={28} />
                </IconButton>
                <IconButton>
                    <MailIcon width={28} height={28} />
                </IconButton>
                <IconButton>
                    <InstagramIcon width={28} height={28} />
                </IconButton>
            </FooterIcons>
        </SocialSectionContainer>
    );
}

const TextArea = styled((props: React.ComponentProps<typeof TextField>) => (
    <TextField {...props} margin="none" size="small" fullWidth type={'email'} />
))({
    [`& fieldset`]: {
        borderRadius: 42
    }
});

const MuiButton = styled((props: React.ComponentProps<typeof Button>) => (
    <Button {...props} fullWidth disableElevation variant="contained" />
))({
    borderRadius: 42,
    margin: '12px 0'
});
