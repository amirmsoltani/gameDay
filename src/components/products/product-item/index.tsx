import { Button, Typography } from '@mui/material';
import React from 'react';
import { PlusIconSvg } from 'src/assets/exercise/action';
import * as S from '../exercise.styled';

interface IProductItemProps {
    image?: string;
    title: string;
    onClick: () => void;
    onAddClick?: () => void;
    price: number;
    count: number;
}

export const ProductItem = ({
    image,
    title,
    onClick,
    onAddClick,
    price,
    count
}: IProductItemProps) => {
    return (
        <S.WrapperProductItem
            onClick={(e) => {
                onClick();
            }}>
            <S.TopWrapperItemProduct>
                <S.ImageWrapperItemExercise>
                    {image && <S.ImgProductItem src={image} alt={title} />}
                    <S.IconShow
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddClick && onAddClick();
                        }}
                        right="20"
                        top="10">
                        <PlusIconSvg />
                    </S.IconShow>
                </S.ImageWrapperItemExercise>
                <S.DescriptionImage>
                    <Typography>{title}</Typography>
                    <Typography>$ {price} </Typography>
                </S.DescriptionImage>
            </S.TopWrapperItemProduct>
            <S.TitleItemExercise>
                {count < 1 ? (
                    <Button
                        color="inherit"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddClick && onAddClick();
                        }}>
                        Add To Card
                    </Button>
                ) : (
                    count
                )}
            </S.TitleItemExercise>
        </S.WrapperProductItem>
    );
};
