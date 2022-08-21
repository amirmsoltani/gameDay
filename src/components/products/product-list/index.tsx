import React from 'react';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { GetAllProductsQuery } from 'src/graphql/generated';
import { ProductItem } from '../product-item';
import { useDispatch } from 'react-redux';
import { addStoreCard } from 'src/redux/actions/actions';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface IProductListProps {
    lists: GetAllProductsQuery['product_getProducts']['result']['items'];
}

export const ProductList = ({ lists }: IProductListProps) => {
    const router = useRouter();

    const dispatch = useDispatch();

    return (
        <Droppable isDropDisabled droppableId="product-1" type="product-quick">
            {(providedDropp) => (
                <Grid
                    container
                    spacing="30px"
                    ref={providedDropp.innerRef}
                    {...providedDropp.droppableProps}>
                    {lists.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={'product-drag-' + item.id.toString()}
                            index={index}>
                            {(provided) => (
                                <Grid
                                    lg={4}
                                    xs={6}
                                    item
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <ProductItem
                                        count={0}
                                        price={item.price}
                                        onClick={() => router.push(`/shop/${item.id}`)}
                                        title={item.name}
                                        // image={item.photoUrl}
                                        image="/images/temp/product-1.png"
                                        onAddClick={() => dispatch(addStoreCard(item))}
                                    />
                                </Grid>
                            )}
                        </Draggable>
                    ))}
                    {providedDropp.placeholder}
                </Grid>
            )}
        </Droppable>
    );
};
