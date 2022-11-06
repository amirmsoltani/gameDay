import Loading from '@/components/loading';
import AppLayout from '@/layout/app-layout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useCreateSkillMutation } from 'src/graphql/generated';

const AddSkill = () => {
    const router = useRouter();
    const createSkill = useCreateSkillMutation({
        onSuccess: (data) => {
            router.replace(`/catalog/skill/?id=${data.skill_addSkill.result.id}`);
        }
    });

    useEffect(() => {
        if (!router.query.id) router.replace('/catalog');
        createSkill.mutate({ input: { skillCategoryId: +router.query.id } });
    }, []);
    return (
        <AppLayout>
            <Loading />
        </AppLayout>
    );
};

export default AddSkill;
