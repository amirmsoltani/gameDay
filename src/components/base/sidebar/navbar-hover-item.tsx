import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { INavbarItems } from './sidebar-hover';
import * as S from './snackbar.styled';

type Props = {
    item: INavbarItems;
    isHover : boolean;
};

export const NavbarHoverItem = ({ item, isHover }: Props) => {
    const [isItemHover, setIsItemHover] = useState(false)
    const router = useRouter();

  return (
    <S.NavbarHoverItemWrapper
                    onMouseEnter={() => setIsItemHover(true)}
                    onMouseLeave={() => setIsItemHover(false)}
                    isHover={isItemHover.toString()}
                        onClick={() => {
                            if (item.type === 'action') {
                                item.onClick(item.id);
                            } else {
                                router.push(item.link);
                            }
                        }}>
                        <S.NavbarItemIcon
                        isHover={isItemHover.toString()}>
                            <item.Icon />
                        </S.NavbarItemIcon>
                        {isHover && <S.TitleSidbarHover>{item.title}</S.TitleSidbarHover>}
                    </S.NavbarHoverItemWrapper>
  )
}
