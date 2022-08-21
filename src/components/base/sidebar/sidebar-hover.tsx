import React, { useState } from 'react';
import { NavbarHoverItem } from './navbar-hover-item';
import * as S from './snackbar.styled';

export interface INavbarItems {
    Icon: any;
    title: string;
    link: string;
    id: number;
    type: 'action' | 'link';
    onClick: (e?: number) => void;
}

type Props = {
    items: INavbarItems[];
    maxWidth?: number | string;
};

export const SideBarHover = ({ items, maxWidth = '' }: Props) => {
    const [isHover, setIsHover] = useState(false);
   

    return (
        <S.WrapperSidebarHover>
            <S.SidebarHoverBG
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                maxWidth={maxWidth.toString()}
                isHover={isHover.toString()}>
                {items.map((item) => (
                    <NavbarHoverItem
                    isHover={isHover}
                    item={item}
                    key={item.id}
                    ></NavbarHoverItem>
                ))}
            </S.SidebarHoverBG>
        </S.WrapperSidebarHover>
    );
};
