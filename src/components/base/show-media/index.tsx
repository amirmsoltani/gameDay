import { Grid } from '@mui/material';
import React, { useState } from 'react';
import * as S from './media.styled';

interface IMediaProps {
    type: 'video' | 'picture';
    url: string;
    id: number;
}

type Props = {
    items: IMediaProps[];
};

export const ShowMedia = ({ items }: Props) => {
    const [acitveMedia, setActiveMedia] = useState(0);
    return (
        <Grid container>
            <Grid item xs={10}>
                <S.MediaContent>
                    {items[acitveMedia].type === 'picture' ? (
                        <S.ImageContainer src={items[acitveMedia].url} alt="Image alt" />
                    ) : (
                        <S.VideoContainer>
                            <source src={items[acitveMedia].url}></source>
                        </S.VideoContainer>
                    )}
                </S.MediaContent>
            </Grid>
            <Grid item xs={2}>
                <S.WrapperMedia>
                    {items.map((item, index) => (
                        <S.ItemConteiner
                            onClickButton={() => setActiveMedia(index)}
                            type={item.type}
                            key={item.id}
                            url={item.url}
                        />
                    ))}
                </S.WrapperMedia>
            </Grid>
        </Grid>
    );
};
