import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { IQuickListStoreCard } from 'src/redux/reducer/reducer';
import { QuickItemProduct } from './quick-item-product';
import * as S from './quick.styled';

export const ListQuickProductsWrapper = ({ storeCard }: IQuickListStoreCard) => {
    return (
        <Droppable direction="vertical" droppableId="product-2" type="product-quick">
            {(provided) => (
                <S.ListWrapper ref={provided.innerRef} {...provided.droppableProps}>
                    {storeCard.map((item, index) => (
                        <QuickItemProduct product={item} index={index} key={item.id} />
                    ))}
                    {provided.placeholder}
                </S.ListWrapper>
            )}
        </Droppable>
    );
};
