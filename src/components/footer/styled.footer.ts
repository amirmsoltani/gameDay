import { Interpolation, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { ClassAttributes, ElementType, HTMLAttributes } from 'react';

type Style = Interpolation<
    {
        theme?: Theme;
        as?: ElementType<any>;
    } & ClassAttributes<HTMLElement> &
        HTMLAttributes<HTMLElement>
>;

const footerFlexShared: Style = {
    '@media(min-width:1000px)': {
        flex: 1
    },
    '@media(max-width:1000px)': {
        flexBasis: '30%'
    },
    '@media(max-width:700px)': {
        flexBasis: '45%'
    }
};

export const FooterContainer = styled.footer({
    padding: '85px 20px',
    height: 'fit-content',
    backgroundColor: '#E7F1FC'
});

export const HealingTypeContainer = styled.div({
    textAlign: 'center',
    ...footerFlexShared
});

export const HealingTypeTitle = styled(Typography)({ marginBottom: '15px' });

export const HealingTypeBody = styled(Typography)({ marginBottom: '5px' });

export const FooterIcons = styled.div({
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'space-around'
});

export const SocialSectionContainer = styled.div({
    margin: 'auto',
    maxWidth: '400px',
    textAlign: 'center',
    paddingRight: '20px',
    minWidth: '300px',
    ...footerFlexShared
});
