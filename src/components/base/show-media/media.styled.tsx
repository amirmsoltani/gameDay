import { Box, Button, styled } from '@mui/material';

export const WrapperMedia = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: 17
});

export const MediaContent = styled(Box)({
    height: 550
});

export const ImageContainer = styled('img')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    borderRadius: 30,
    objectFit: 'cover',
    objectPosition: 'center'
}));

export const VideoContainer = styled('video')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    borderRadius: 30,
    objectFit: 'cover',
    objectPosition: 'center'
}));

export const ItemConteiner = styled(
    (
        props: React.ComponentProps<typeof Button> & {
            onClickButton: () => void;
            type: 'video' | 'picture';
            url: String;
        }
    ) => (
        <Button onClick={() => props.onClickButton()}>
            {props.type === 'picture' ? (
                <ImageContainer src={props.url} alt="picture" />
            ) : (
                <VideoContainer>
                    <source src={props.url}></source>
                </VideoContainer>
            )}
        </Button>
    )
)({});
