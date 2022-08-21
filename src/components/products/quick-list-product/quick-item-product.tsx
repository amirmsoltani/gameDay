import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { RemoveIconSvgBold } from 'src/assets/exercise/action';
import * as S from './quick.styled';
import { useDispatch } from 'react-redux';
import { removeStoreCard } from 'src/redux/actions/actions';
import { CounterProduct } from '@/components/products/counter-product';
import { Draggable } from 'react-beautiful-dnd';
import { IQuickListStoreCard } from 'src/redux/reducer/reducer';

interface IQuickItemProduct {
    product: IQuickListStoreCard['storeCard'][number];
    index: number;
}

interface IProductItemEquipmentProps {
    item: IQuickListStoreCard['storeCard'][number];
    count: number;
    setCount: (e: number) => void;
    name: string;
}

const ProductItemEquipment = ({ item, count, setCount, name }: IProductItemEquipmentProps) => {
    const product = item;

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={2}>
            <Typography sx={{ fontWeight: 'bold' }}>$ {product.price}</Typography>
            <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                {/* {product.colors?.map((color, index) => (
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    backgroundColor: color,
                                    borderRadius: '50%',
                                    margin: '0 5px',
                                    cursor: 'pointer'
                                }}
                                key={index}></Box>
                        ))} */}
            </Box>
            <Box>
                <CounterProduct setCounter={setCount} count={count} name={name} />
            </Box>
        </Box>
    );
};

export const QuickItemProduct = ({ product, index }: IQuickItemProduct) => {
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);
    return (
        <Draggable
            isDragDisabled
            draggableId={'product-drop-' + product.id.toString()}
            index={index}>
            {(provided) => (
                <S.ExerciseItemWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <S.WrapperExercise>
                        <S.ImageWrapper>
                            <S.ImageExercise
                                src="/images/temp/product-1.png"
                                // src={exercise.exercise.photoUrl}
                                alt={product.name}
                            />
                        </S.ImageWrapper>
                        <Box
                            flex={1}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between">
                            <Box>
                                <S.TitleExercise>{product?.name}</S.TitleExercise>
                            </Box>
                            <ProductItemEquipment
                                item={product}
                                name={`count.${index}`}
                                count={count}
                                setCount={setCount}
                            />
                        </Box>
                        <Box>
                            <S.RemoveButton onClick={() => dispatch(removeStoreCard(product.id))}>
                                <RemoveIconSvgBold />
                            </S.RemoveButton>
                        </Box>
                    </S.WrapperExercise>
                </S.ExerciseItemWrapper>
            )}
        </Draggable>
    );
};
