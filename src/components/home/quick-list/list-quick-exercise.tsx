import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { IQuickListExercise } from 'src/redux/reducer/reducer';
import { QuickItemExercise } from './quick-item-exercise';
import * as S from './quick.styled';

export const ListQuickExerciseWrapper = ({ exerciseBoard }: IQuickListExercise) => {
    return (
        <Droppable direction="vertical" droppableId="exercise-2" type="exercise-quick">
            {(provided) => (
                <S.ListWrapper ref={provided.innerRef} {...provided.droppableProps}>
                    {exerciseBoard.map((item, index) => (
                        <QuickItemExercise exercise={item} index={index} key={item.exercise.id} />
                    ))}
                    {provided.placeholder}
                </S.ListWrapper>
            )}
        </Droppable>
    );
};
