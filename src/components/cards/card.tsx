import Link from 'next/link';
import { Spacer } from '../base/spacer';
import { useDispatch } from 'react-redux';
import { MImage } from '../base/image/MImage';
import CardMedia from '@mui/material/CardMedia';
import RatingComponent from './rating-component';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { newModal } from 'src/redux/actions/actions';
import { Box, Button, CardActions, Rating, styled, useTheme, Card as MUICard } from '@mui/material';

const Price = styled(Typography)({
    padding: '0 10px',
    background: 'white',
    borderRadius: 3,
    fontSize: 20,
    boxShadow: '0px 0px 9px -2px rgba(0,0,0,0.26)'
});

const RecordIcon = styled('div')(({ record }: { record: boolean }) => ({
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: record ? '#349B48' : '#D84444'
}));

const CustomButtonm = styled(Button)(({ theme }) => ({
    width: '200px',
    borderRadius: '20px',
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    [theme.breakpoints.down('sm')]: {
        width: '150px'
    }
}));

export default function Card({
    title = 'Card title',
    description = 'Card description',
    imageUrl = '/images/temp/1.png',
    buttonLabel = 'See Sessions',
    rate = undefined,
    bio = undefined,
    healingType = '',
    price = 0,
    path = '#',
    duration = 0,
    Status = null,
    record = false,
    style = {},
    rating = false,
    healerName = undefined,
    ID = undefined,
    event = null
}) {
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleModal = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: RatingComponent,
                title: `${title} / ${healerName}`,
                topBar: true,
                id: '1',
                variables: {
                    sessionid: ID
                }
            })
        );
    };

    return (
        <MUICard
            sx={{
                minWidth: 200,
                backgroundColor: '#F5F8FC',
                borderRadius: '15px',
                ...style
            }}>
            <CardMedia>
                <MImage
                    resources={{ src: imageUrl }}
                    style={{ height: 200, width: '100%', objectFit: 'cover' }}
                />
            </CardMedia>
            <CardContent sx={{ minHeight: 190, cursor: 'default', overflow: 'auto' }}>
                {rating === true && (
                    <div
                        onClick={handleModal}
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: '500',
                            color: 'rgb(82, 147, 211)',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}>
                        Rating
                    </div>
                )}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                    sx={{ minHeight: '68px', maxHeight: '68px' }}
                    mb={2}>
                    <Box display="flex" alignItems="center">
                        <Typography
                            gutterBottom
                            variant="h5"
                            color={theme.palette.secondary.darker}
                            fontWeight="bold"
                            component="div"
                            sx={{ marginBottom: 0 }}>
                            {title}
                        </Typography>
                        {healingType !== '' && (
                            <Typography style={{ fontSize: 18, color: '#58636E' }}>
                                {' '}
                                / {healingType}
                            </Typography>
                        )}
                        {rate !== undefined && (
                            <Rating
                                value={rate}
                                style={{ marginRight: 5, marginLeft: 5 }}
                                readOnly
                                size="small"
                            />
                        )}
                    </Box>
                    {price !== 0 && <Price>${price}</Price>}
                </Box>
                {duration !== 0 && (
                    <>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <Box display="flex" alignItems="baseline">
                                <Typography variant="h6" color={theme.palette.secondary.darker}>
                                    Duration:
                                </Typography>
                                <Typography variant="body2" ml={1} color="text.secondary">
                                    {duration}
                                </Typography>
                            </Box>
                            <Box>
                                <Box display="flex" alignItems="center">
                                    <Typography
                                        variant="body1"
                                        color={theme.palette.secondary.darker}>
                                        Record:
                                    </Typography>
                                    <Spacer space={13} />
                                    {Status === 'OFFLINE' && Status !== undefined ? (
                                        '----'
                                    ) : (
                                        <RecordIcon record={record} />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Spacer space={10} />
                    </>
                )}
                <Box display="flex">
                    <Typography variant="body2" color="text.secondary">
                        <span
                            style={{
                                color: theme.palette.secondary.darker,
                                fontSize: '1.25rem',
                                fontFamily: 'Helvetica'
                            }}>
                            {bio ? 'Bio: ' : 'Description: '}
                        </span>
                        {bio ? bio : description}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions
                style={{ paddingBottom: '17px', marginTop: event == 'PRIVATE_EVENT' && '35px' }}>
                {event !== 'PRIVATE_EVENT' && (
                    <Link href={path}>
                        <a
                            style={{
                                margin: 'auto',
                                marginTop: '5px',
                                color: 'inherit',
                                textDecoration: 'none',
                                fontFamily: 'yeseva-reg'
                            }}>
                            <CustomButtonm size="small" variant="outlined">
                                {buttonLabel}
                            </CustomButtonm>
                        </a>
                    </Link>
                )}
            </CardActions>
        </MUICard>
    );
}
