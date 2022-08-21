import { Grid, styled } from '@mui/material';
import React from 'react';
import { IDataOnBoarding, IOnBoardingProps } from '.';
import * as S from './on_boardin.styled';

interface TitleProps extends IOnBoardingProps {
    item: IDataOnBoarding;
    handleNext: React.MouseEventHandler<HTMLElement>;
    lengthItems: number;
}

const StepperElement = styled('div')<{ active: string }>(({ theme, active }) => ({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: active === 'true' ? 'none' : `solid 1px ${theme.palette.primary.dark}`,
    backgroundColor: active === 'true' ? theme.palette.primary.main : theme.palette.primary.light
}));

const GridContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        padding: '15px 25px'
    },
    [theme.breakpoints.up('md')]: {
        padding: '40px 75px'
    },
    minHeight: '100vh'
}));

export default ({ handleSkip, item, handleNext, lengthItems }: TitleProps) => {
    const SvgElement = styled(item.svgElement)();

    return (
        <GridContainer
            container
            alignItems="center"
            justifyContent="space-between"
            direction="column">
            <Grid item container direction="column" alignItems="center">
                <Grid container alignItems="center" justifyContent="space-between">
                    <S.Title>{item.title}</S.Title>
                    <S.ButtonSkip onClick={handleSkip}>Skip</S.ButtonSkip>
                </Grid>
                <Grid
                    style={{
                        maxHeight: '550px',
                        width: '100%',
                        maxWidth: '600px'
                    }}>
                    <SvgElement />
                </Grid>
            </Grid>
            <Grid item container direction="column">
                <S.DescriptionText>{item.description}</S.DescriptionText>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item container xs={6} spacing={2}>
                        {Array(lengthItems)
                            .fill('')
                            .map((_, index) => (
                                <Grid key={index} item>
                                    <StepperElement active={(index + 1 === item.id).toString()} />
                                </Grid>
                            ))}
                    </Grid>
                    <Grid item container justifyContent="flex-end" xs={6}>
                        <S.ButtonElement onClick={handleNext}>Next</S.ButtonElement>
                    </Grid>
                </Grid>
            </Grid>
        </GridContainer>
    );
};
