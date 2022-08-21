import React, { useState } from 'react';
import { OnBoardingFirstSVG, OnBoardingSecoundSVG, OnBoardingShopSVG } from 'src/assets/home';
import Step_onboarding from './step_onboarding';
import * as S from './on_boardin.styled';

export type IOnBoardingProps = {
    handleSkip: () => void;
};

export interface IDataOnBoarding {
    title: string;
    description: string;
    svgElement: React.ReactNode;
    id: number;
}

const dataOnboarding: IDataOnBoarding[] = [
    {
        title: 'Exersise',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit ipsum arcu sed turpis diam est scelerisque. Ultrices tristique habitant varius adipiscing vitae aliquam mus praesent. Consectetur pharetra et dui tristique ac.',
        svgElement: OnBoardingFirstSVG,
        id: 1
    },
    {
        title: 'Routine',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit ipsum arcu sed turpis diam est scelerisque. Ultrices tristique habitant varius adipiscing vitae aliquam mus praesent. Consectetur pharetra et dui tristique ac.',
        svgElement: OnBoardingSecoundSVG,
        id: 2
    },
    {
        title: 'Shop',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit ipsum arcu sed turpis diam est scelerisque. Ultrices tristique habitant varius adipiscing vitae aliquam mus praesent. Consectetur pharetra et dui tristique ac.',
        svgElement: OnBoardingShopSVG,
        id: 3
    }
];

const OnBoarding = ({ handleSkip }: IOnBoardingProps) => {
    const [step, setStep] = useState<number>(1);

    const handleNext = () =>
        step < dataOnboarding.length ? setStep((oldStep) => oldStep + 1) : handleSkip();

    return (
        <S.WrapperOnBoarding>
            {dataOnboarding.map(
                (item) =>
                    item.id === step && (
                        <Step_onboarding
                            handleSkip={handleSkip}
                            handleNext={handleNext}
                            key={item.id}
                            item={item}
                            lengthItems={dataOnboarding.length}
                        />
                    )
            )}
        </S.WrapperOnBoarding>
    );
};

export default OnBoarding;
