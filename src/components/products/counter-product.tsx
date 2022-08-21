import React from 'react';
import { MineuseIconSvg, PlusIconSvg } from 'src/assets/exercise/action';
import * as S from './product.styled';

type ICounterProductProps = {
    count: number;
    setCounter: (e: number) => void;
    name: string;
};

export const CounterProduct = ({ count, setCounter, name }: ICounterProductProps) => {
    return (
        <S.WrapperCounterProduct>
            <S.ButtonActionCounter type="button" onClick={() => setCounter(count - 1)}>
                <MineuseIconSvg />
            </S.ButtonActionCounter>
            <S.InputCounter value={count} name="" onChange={(e) => setCounter(+e.target.value)} />
            <S.ButtonActionCounter
                type="button"
                onClick={() => setCounter(count >= 0 ? count + 1 : count)}>
                <PlusIconSvg />
            </S.ButtonActionCounter>
        </S.WrapperCounterProduct>
    );
};
