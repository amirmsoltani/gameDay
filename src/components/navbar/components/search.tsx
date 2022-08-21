import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useCustomHook from './search-custom-hook';
import { Spacer } from '@/components/base/spacer';
import SearchIcon from 'src/assets/common/search';
import { useGetUser } from 'src/auth/UserProvider';
import { SearchContainer } from '../styled.navbar';
import { getFullImageUrl } from '@/utils/helper/ui';
import { MImage } from '@/components/base/image/MImage';
import { useCallback, useEffect, useState } from 'react';
import { useUserLoginOrNot } from 'src/auth/useRedirectOnToken';
import { closeModal, newModal } from 'src/redux/actions/actions';
import {
    Box,
    styled,
    useTheme,
    TextField,
    Typography,
    InputAdornment,
    CircularProgress
} from '@mui/material';

const CustomInputSearch = styled(TextField)({
    width: '80vw',
    padding: '0 16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '25px',
        backgroundColor: 'white',
        margin: 0,
        border: '1px solid #C0c1c1',
        '& .MuiInputBase-input': {
            color: '#A587C2'
        },
        '& fieldset': {
            borderColor: 'white'
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white'
        }
    }
});

const SearchBox = styled(Box)<{ mobile: boolean }>(({ mobile }) => ({
    display: mobile ? 'none' : 'flex',
    width: mobile ? '100vw' : 'unset',
    '@media(max-width: 570px)': {
        display: mobile ? 'flex' : 'none'
    }
}));

const SearchBar = styled(Box)(({ theme }) => ({
    width: 270,
    maxHeight: '50%',
    overflow: 'auto',
    background: 'white',
    borderRadius: '0 0 12px 12px',
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 230,
    '@media(max-width: 570px)': {
        right: 'auto',
        left: 17
    }
}));

const Search = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [hasSearch, setHasSearch] = useState(false);
    useUserLoginOrNot();
    const user = useGetUser();

    useEffect(() => {
        if (
            router.pathname === '/healing' ||
            router.pathname === '/healers' ||
            router.asPath.includes('/healers/healer/') ||
            router.asPath.includes('/healing/session/')
        )
            setHasSearch(true);
        else setHasSearch(false);
    }, [router.pathname]);

    const searchOnChangeHandler = (e) => {
        const searchData = e.target.value;

        dispatch(closeModal('search'));
        dispatch(
            newModal({
                id: 'search',
                Container: SearchBarContainer,
                Body: SearchBarBody,
                searchData: searchData,
                hasSearch: typeof user === 'string' ? hasSearch : false
            })
        );
        if (e.target.value === '') dispatch(closeModal('search'));
    };

    return (
        <>
            {!hasSearch ? (
                <></>
            ) : (
                <SearchContainer
                    key="6"
                    sx={{ cursor: 'pointer', fontFamily: 'Helvetica', marginRight: '20px' }}>
                    <SearchBox mobile={false}>
                        <TextField
                            onChange={searchOnChangeHandler}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </SearchBox>
                    <SearchBox mobile={true}>
                        <CustomInputSearch
                            onChange={searchOnChangeHandler}
                            placeholder="Search Project"
                            id="standard"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                style: {
                                    width: '100%',
                                    height: '38px',
                                    maxWidth: '343px'
                                }
                            }}
                        />
                    </SearchBox>
                </SearchContainer>
            )}
        </>
    );
};

export default Search;

const SearchBarContainer = ({ children }) => {
    return <SearchBar>{children}</SearchBar>;
};

export const SearchBarBody = ({ searchData }) => {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();

    const { data, isLoading } = useCustomHook({ searchData });

    const onClickHandler = useCallback(
        (item) => {
            dispatch(closeModal('search'));
            router.push(item.link);
        },
        [searchData]
    );

    return (
        <>
            {isLoading ? (
                <Box width="100%" display="flex" justifyContent="center">
                    <CircularProgress size="2rem" sx={{ color: theme.palette.primary.main }} />
                </Box>
            ) : data?.length > 0 ? (
                data?.map((item) => (
                    <Box
                        onClick={onClickHandler.bind(null, item)}
                        sx={{
                            padding: 0.5,
                            width: '100%',
                            display: 'flex',
                            borderRadius: 2,
                            cursor: 'pointer',
                            marginBottom: '8px',
                            alignItems: 'center',
                            justifyContent: 'start',
                            ':hover': {
                                backgroundColor: theme.palette.primary.light
                            }
                        }}>
                        <MImage
                            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 12 }}
                            resources={{ src: getFullImageUrl(item.imageAddress) }}
                        />
                        <Spacer space={2} />
                        <Typography color="black" fontSize="14px">
                            {item.title}
                        </Typography>
                    </Box>
                ))
            ) : (
                <Typography fontSize="14px" color="gray">
                    Not found!
                </Typography>
            )}
        </>
    );

    // function getSearchResult() {
    //     if (router.pathname === '/healing') {
    //         const { data, isLoading } = useHealingType_GetAllHealingTypesQuery({
    //             where: { title: { contains: searchData } }
    //         });
    //         setRes({
    //             isLoading,
    //             data: data?.healingType_getAllHealingTypes?.result?.items?.map?.((item) => ({
    //                 id: item.id,
    //                 link: `/healing/session?id=${item.id}&type=${item.title}`,
    //                 title: item.title,
    //                 imageAddress: item.imageAddress
    //             }))
    //         });
    //     } else if (router.pathname === '/healers') {
    //         const { data, isLoading } = useUser_GetAllHealersQuery({
    //             where: { name: { contains: searchData } }
    //         });
    //         setRes({
    //             isLoading,
    //             data: data?.user_getAllHealers?.result?.items?.map?.((item) => ({
    //                 id: item.healer.id,
    //                 link: `/healers/healer/?id=${item?.healer?.id}`,
    //                 title: item.name,
    //                 imageAddress: item.imageAddress
    //             }))
    //         });
    //     } else if (router.asPath.includes('/healers/healer/')) {
    //         const { data, isLoading } = useSession_GetAllSessionsQuery({
    //             where: {
    //                 and: [
    //                     { hostId: { eq: Number(router.query.id) } },
    //                     { title: { contains: searchData } }
    //                 ]
    //             }
    //         });
    //         setRes({
    //             isLoading,
    //             data: data?.session_getAllSessions?.result?.items?.map?.((item) => ({
    //                 id: item.id,
    //                 link: `/healing/session/details?sessionid=${item.id}`,
    //                 title: item.title,
    //                 imageAddress: item.sessionImages[0].imageAddress
    //             }))
    //         });
    //     } else if (router.asPath.includes('/healing/session/')) {
    //         const { data, isLoading } = useSession_GetAllSessionsQuery({
    //             where: {
    //                 and: [
    //                     { healingTypeId: { eq: Number(router.query.id) } },
    //                     { title: { contains: searchData } }
    //                 ]
    //             }
    //         });
    //         setRes({
    //             isLoading,
    //             data: data?.session_getAllSessions?.result?.items?.map?.((item) => ({
    //                 id: item.id,
    //                 link: `/healing/session/details?sessionid=${item.id}`,
    //                 title: item.title,
    //                 imageAddress: item.sessionImages[0].imageAddress
    //             }))
    //         });
    //     }
    // }
};
