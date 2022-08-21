import React, { useEffect, useState } from 'react';
import MainLayout from '@/layout/main.layout';
import Home from '@/components/home';
import OnBoarding from '@/components/home/on_boarding';
import { useCategory_GetCategoriesQuery } from 'src/graphql/generated';

const Index: React.FC = () => {
    const [isFirstTime, setIsFirstTime] = useState(null);

    const { data, isLoading, isSuccess } = useCategory_GetCategoriesQuery();

    const handleSkip = () => {
        setIsFirstTime(false);
        localStorage.setItem('accepted-onboarding', 'false');
    };

    useEffect(() => {
        setIsFirstTime(localStorage.getItem('accepted-onboarding') ? false : true);
    }, []);

    return (
        <MainLayout withoutFooter withoutHeader={isFirstTime}>
            {isFirstTime && <OnBoarding handleSkip={handleSkip} />}
            {isSuccess && !isLoading && (
                <Home
                    isFirstTime={isFirstTime}
                    categories={data?.category_getCategories.result.items || []}
                />
            )}
        </MainLayout>
    );
};

export default Index;
