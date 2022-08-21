import { useRouter } from 'next/router';
import {
    useHealingType_GetAllHealingTypesQuery,
    useSession_GetAllSessionsQuery,
    useUser_GetAllHealersQuery
} from 'src/graphql/generated';

const useCustomHook = ({ searchData }) => {
    const router = useRouter();

    const { data: healingTypeRouteData, isLoading: isLoading1 } =
        useHealingType_GetAllHealingTypesQuery(
            {
                where: { title: { contains: searchData } }
            },
            { enabled: router.pathname === '/healing' }
        );
    const healingTypeRouteDataTemp =
        healingTypeRouteData?.healingType_getAllHealingTypes?.result?.items?.map?.((item) => ({
            id: item?.id,
            link: `/healing/session?id=${item?.id}&type=${item?.title}`,
            title: item?.title,
            imageAddress: item?.imageAddress || ''
        }));

    const { data: healersRouteData, isLoading: isLoading2 } = useUser_GetAllHealersQuery(
        {
            where: { name: { contains: searchData } }
        },
        { enabled: router.pathname === '/healers' }
    );
    const healersRouteDataTemp = healersRouteData?.user_getAllHealers?.result?.items?.map?.(
        (item) => ({
            id: item?.healer?.id,
            link: `/healers/healer/?id=${item?.healer?.id}`,
            title: item?.name,
            imageAddress: item?.imageAddress || ''
        })
    );

    const { data: healerDetailRouteData, isLoading: isLoading3 } = useSession_GetAllSessionsQuery(
        {
            where: {
                and: [
                    { hostId: { eq: Number(router.query.id) } },
                    { title: { contains: searchData } }
                ]
            }
        },
        { enabled: router.asPath.includes('/healers/healer/') }
    );
    const healerDetailRouteDataTemp =
        healerDetailRouteData?.session_getAllSessions?.result?.items?.map?.((item) => ({
            id: item?.id,
            link: `/healing/session/details?sessionid=${item?.id}`,
            title: item?.title,
            imageAddress: item?.sessionImages[0]?.imageAddress || ''
        }));

    const { data: healingSessionRouteData, isLoading: isLoading4 } = useSession_GetAllSessionsQuery(
        {
            where: {
                and: [
                    { healingTypeId: { eq: Number(router.query.id) } },
                    { title: { contains: searchData } }
                ]
            }
        },
        { enabled: router.asPath.includes('/healing/session/') }
    );
    const healingSessionRouteDataTemp =
        healingSessionRouteData?.session_getAllSessions?.result?.items?.map?.((item) => ({
            id: item?.id,
            link: `/healing/session/details?sessionid=${item?.id}`,
            title: item?.title,
            imageAddress: item?.sessionImages[0]?.imageAddress || ''
        }));

    const data =
        healingTypeRouteDataTemp ||
        healersRouteDataTemp ||
        healerDetailRouteDataTemp ||
        healingSessionRouteDataTemp;

    const isLoading = isLoading1 || isLoading2 || isLoading3 || isLoading4;

    return { data, isLoading };
};

export default useCustomHook;
